<?php
function main() {
  $_Wordpress = file_exists ( 'wp-blog-header.php' );
  if( $_Wordpress ){
    /**
     *
     * @package WordPress
     */

    /**
     * Tells WordPress to load the WordPress theme and output it.
     *
     * @var bool
     */
    define('WP_USE_THEMES', true);

    /** Loads the WordPress Environment and Template */
    require( dirname( __FILE__ ) . '/wp-blog-header.php' );

  } else {

    html_request();

  }
}
function html_request(){
  $html = file_get_contents( dirname( __FILE__ ) . '/index.html' );
  echo $html;
}

function data_request(){

}

main();
