import { registerBlockType } from '@wordpress/blocks';
import { withSelect } from '@wordpress/data';

registerBlockType(
    'pg/menu',
    {
        title: 'La pizzeria Menu',
        icon: 'smiley',
        category: 'elpizza',
        edit: withSelect((select) => {
            return {
                // Enviar una peticion a la api
                especialidades: select("core").getEntityRecords('postType', 'especialidades')
            };
        })
        (   ({ especialidades }) => {
                console.log(especialidades)
                return (
                    <>
                        <h2>Nuestras Especialidades</h2>
                        <ul className="nuestro-menu">
                            {especialidades.map(especialidad => (
                                <li>
                                    <h3>{especialidad.title.rendered}</h3>
                                </li>
                            ))}
                        </ul>
                    </>
                )
            }
        ),
        save: () => {
            return null;
        }
    }
)