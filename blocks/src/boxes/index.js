import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/editor';

registerBlockType(
    'pg/basic',
    {
        title:          'Basic Block',
        description:    'Este es el primer bloque',
        icon:           'smiley',
        category:       'elpizza',
        edit: () => {
            return(
                <div>
                    <h2>
                        <RichText
                            placeholder="Agrega el encabezado"
                        />
                    </h2>
                </div>
            )
        },
        save: () => {
            return(
                <h2>Esto es el save</h2>
            )
        }
    }
)