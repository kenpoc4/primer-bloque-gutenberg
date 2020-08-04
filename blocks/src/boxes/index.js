import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls, ColorPalette, BlockControls, AlignmentToolbar } from '@wordpress/editor';
import { PanelBody } from '@wordpress/components';

/**
*           7 Pasos para crear un bloque Gutenberg
        1.- Importar el componente(s) que utilizaremos
        2.- Colocar el componente donde se desea utilizar
        3.- Crear una funcion que lea los contenidos
        4.- Registrar un atributo
        5.- Extraer el contenido desde los Props
        6.- Guardar el contenido con setAttributes
        7.- Leer los contenidos gusrdados en save()
*/

registerBlockType(
    'pg/basic',
    {
        title:          'Basic Block',
        description:    'Este es el primer bloque',
        icon:           'smiley',
        category:       'elpizza',
        attributes: {
            headingBox : {
                type: 'string',
                source: 'html',
                selector: '.box h2'
            },
            textoBox: {
                type: 'string',
                source: 'html',
                selector: '.box p'
            },
            colorFondo: {
                type: 'string'
            },
            colorTexto: {
                type: 'string'
            },
            alineacionContenido: {
                type: 'string',
                default: 'center'
            }
        },
        edit: (props) => {

            console.log(props);

            // Extrayendo el contenido desde los Props
            const { attributes: {headingBox, textoBox, colorFondo, colorTexto, alineacionContenido}, setAttributes } = props;

            const onChangeHeadingBox = nuevoHeading => {
                setAttributes({headingBox : nuevoHeading});
            }

            const onChangeTextoBox = nuevoTexto => {
                setAttributes({textoBox : nuevoTexto });
            }

            const onChangeColorFondo = nuevoColor => {
                setAttributes({colorFondo : nuevoColor});
            }

            const onChangeColorTexto = nuevoColor => {
                setAttributes({colorTexto : nuevoColor})
            }

            const onChangeAlinearContenido = nuevaAlineacion => {
                setAttributes({alineacionContenido : nuevaAlineacion})
            }

            return(
                <>
                    <InspectorControls>
                        <PanelBody
                            title={'Color de fondo'}
                            initialOpen={true}
                        >
                            <div className="components-base-control">
                                <div className="components-base-control__field">
                                    <label className="components-base-control__label">
                                        Color de Fondo
                                    </label>
                                    <ColorPalette 
                                        onChange={onChangeColorFondo}
                                        value={colorFondo}
                                    />
                                </div>
                            </div>
                        </PanelBody>
                        <PanelBody
                            title={'Color de Texto'}
                            initialOpen={false}
                        >
                            <div className="components-base-control">
                                <div className="components-base-control__field">
                                    <label className="components-base-control__label">
                                        Color de Texto
                                    </label>
                                    <ColorPalette 
                                        onChange={onChangeColorTexto}
                                        value={colorTexto}
                                    />
                                </div>
                            </div>
                        </PanelBody>
                    </InspectorControls>

                    <BlockControls>
                        <AlignmentToolbar
                            onChange={onChangeAlinearContenido}
                        />
                    </BlockControls>
                    <div className="box" style={{backgroundColor : colorFondo, textAlign : alineacionContenido}}>
                        <h2 style={{color: colorTexto}}>
                            <RichText
                                placeholder = "Agrega el encabezado"
                                onChange = {onChangeHeadingBox}
                                value={headingBox}
                            />
                        </h2>
                        <p style={{color: colorTexto}}>
                            <RichText
                                placeholder="Agrega el texto"
                                onChange={onChangeTextoBox}
                                value={textoBox}
                            />
                        </p>
                    </div>
                </>
            )
        },
        save: (props) => {
            console.log(props);

            // Extrayendo el contenido desde los Props
            const { attributes: {headingBox, textoBox, colorFondo, colorTexto, alineacionContenido} } = props;

            return(
                <div className="box" style={{backgroundColor : colorFondo, textAlign : alineacionContenido}}>
                    <h2 style={{color: colorTexto}}>
                        <RichText.Content value={headingBox}/>
                    </h2>
                    <p style={{color: colorTexto}}>
                        <RichText.Content value={textoBox}/>
                    </p>
                </div>
            )
        }
    }
)