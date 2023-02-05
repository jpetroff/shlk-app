import * as _ from 'underscore'
import constants from './constants'
import './modernizr_build.js'

export function validateURL(str: string) : boolean {
  return constants.regexWeburl.test(str)
}

export function modifyURLSlug (str: string) : string {
  str = str.replace(/[^a-z0-9\s-]/ig, '')
  // str = str.replace(/\s+/ig, ' ').trim()
  str = str.replace(/\s/ig, '-')
  return str
}

export function canShortcutPasteWithKeyboard () : boolean {
  return !(Modernizr.touchevents && Modernizr.mq(constants.MediaQueries.mobile))
}

export function checkMobileMQ () : boolean {
  return Modernizr.mq(constants.MediaQueries.mobile)
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function deleteURLQueryParam(param: string) {
  let _modifiedSearch = new URLSearchParams(window.location.search)
  _modifiedSearch.delete(param)
  window.location.search = _modifiedSearch.toString()
}