import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * This directive prevents invalid characters to be keyed into the input box.
 */
@Directive({
  selector: '[appInvalidCharacters]'
})
export class InvalidCharactersDirective {
  inputElement: ElementRef;

  /**
   * possible values of input are integer and noSpecialChars
   */
  // tslint:disable-next-line:no-input-rename
  @Input('appInputRestriction') appInputRestriction: string;
  arabicRegex = '[\u0600-\u06FF]';

  constructor(el: ElementRef) {
    this.inputElement = el;
  }

  /**
   * This method check for invalid characters and suppressing them.
   * @param event keypress event
   */
  @HostListener('keypress', ['$event'])
  onKeyPress(event: Event): void {
    if (this.appInputRestriction === 'integer') {
      this.integerOnly(event);
    } else if (this.appInputRestriction === 'noSpecialChars') {
      this.noSpecialCharacters(event);
    }
  }

  /**
   * Checks if the event key is an integer
   * @param event keypress event
   */
  integerOnly(event): void {
    const e = event as KeyboardEvent;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    if (
      [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey === true)
    ) {
      // let it happen, don't do anything
      return;
    }
    // if key is not a number then prevent/supress it.
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1) {
      e.preventDefault();
    }
  }

  /**
   * This method checks for special characters and suppressing them accordingly.
   * @param event 
   */
  private noSpecialCharacters(event): void {
    const e = event as KeyboardEvent;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    let k;
    k = event.keyCode; 
    if ((k > 64 && k < 91) || // if it is a lowercase alphabet
        (k > 96 && k < 123) || // or upper case alphabet
         k === 8 || // or backspace/delete
         k === 32 || // or spacebar
        (k >= 48 && k <= 57)) { // or number from 0-9
      return; // then allow the keys and do NOTHING.
    }
    const ch = String.fromCharCode(e.keyCode);
    const regEx = new RegExp(this.arabicRegex);
    if (regEx.test(ch)) { // check special characters/string against regular expression
      return; // if passes then do nothing
    }
    e.preventDefault(); // else this is an INVALID character and suppress it
  }

  /**
   * This method checks the pasted string for invalid characters
   * @param event 
   */
  @HostListener('paste', ['$event']) onPaste(event): void {
    let regex;
    if (this.appInputRestriction === 'integer') {
      regex = /[0-9]/g;
    } else if (this.appInputRestriction === 'noSpecialChars') {
      regex = /[a-zA-Z0-9\u0600-\u06FF]/g;
    }
    const e = event as ClipboardEvent;
    const pasteData = e.clipboardData.getData('text/plain');
    let m;
    let matches = 0;
    // tslint:disable-next-line:no-conditional-assignment
    while ((m = regex.exec(pasteData)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        matches++;
      });
    }
    if (matches === pasteData.length) {
      return;
    } else {
      e.preventDefault();
    }
  }
}
