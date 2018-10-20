'use strict';
function $diffDays( start, end ) {
 return Math.ceil( Math.abs( ( new Date( start ) ).getTime() - ( new Date( end ) ).getTime()  ) / (1000 * 3600 * 24) ); // aantal dagen
}

function $date( date ){
  let d = date === undefined ? new Date() : new Date( date );
  let dd = d.getDate();
  let mm = d.getMonth()+1;
  let yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
