<?php
// Plugin name: Primer bloque
// Descripction: Creación de bloques gutenberg
// Version: 1.0.0
// Author: Kenny Poncio
// Author URI: https://github.com/kenpoc4

if(!defined('ABSPATH'))die();

// Categorias personalizadas
function pizza_categoria_personalizada($categories, $post) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'elpizza',
                'title' => 'Pizza Categoria',
                'icon'  => 'store'
            )
        )
    );
}
add_filter('block_categories', 'pizza_categoria_personalizada', 10, 2);

// Registro de bloques, scripts y css
function pizza_registro_bloque() {

    // Si Gutenberge no existe, salir
    if(!function_exists('register_block_type')) {
        return;
    }
    
    // Llamado al archivo index.asset.php
    $assets = include_once plugin_dir_path(__FILE__).'blocks/build/index.asset.php';

    // Registro de lo bloques en el editor
    wp_register_script(
        'pg-block',
        plugins_url('/blocks/build/index.js', __FILE__),
        $assets['dependencies'],
        $assets['version']
    );

    // Estilos para el editor
    wp_register_style(
        'pg-editor-styles',
        plugins_url('/blocks/build/editor.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime( plugin_dir_path( __FILE__ ).'blocks/build/editor.css')
    );

    // Estilos para los bloques
    wp_register_style(
        'pg-frontend-styles',
        plugins_url('/blocks/build/styles.css', __FILE__),
        array(),
        filemtime( plugin_dir_path( __FILE__ ).'blocks/build/styles.css')
    );

    // Arreglo de bloques
    $blocks = [
        'pg/basic'
    ];
    // Recorrer bloques
    foreach($blocks as $block){
        register_block_type(
            $block,
            array(
                'editor_script' => 'pg-block',
                'editor_style'  => 'pg-editor-styles',
                'style'         => 'pg-frontend-styles'
            )
        );
    }

    // Registrando un bloque dinimico
    register_block_type(
        'pg/menu',
        array(
            'editor_script'     => 'pg-block',
            'editor_style'      => 'pg-editor-styles',
            'style'             => 'pg-frontend-styles',
            'render_callback'   =>  'sitio_especialidades_front_end'
        )
    );

}
add_action('init', 'pizza_registro_bloque');

// COnsulta a la base de datos para mostrar los resultados en el frontend
function sitio_especialidades_front_end() {
    return 'en el front end';
}