<?php

add_action('wp_enqueue_scripts', function(){

  wp_enqueue_script(
    'app',
    get_stylesheet_directory_uri() . '/js/min/app.js',
    [],
    null,
    true
  );

});

/* EOF */
