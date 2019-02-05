/**
 * BLOCK: pricing-6
 *
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

import { blockProps, ContainerSave } from '../commonComponents/container/container';
import Edit from './edit';

/**
 * Provides the initial data for new block
 */
export const defaultItem = {
    title: __( 'Free Version', 'kenzap-pricing' ),
    currency: __( '$', 'kenzap-pricing' ),
    price: '0',
    subItems: [
        { option: __( 'Lorem Impusm', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ) },
        { option: __( 'Dolor', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ) },
        { option: __( 'Sit An', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ) },
        { option: __( 'Amet', 'kenzap-pricing' ), availability: __( 'No', 'kenzap-pricing' ) },
        { option: __( 'Ipsum', 'kenzap-pricing' ), availability: __( 'No', 'kenzap-pricing' ) },
        { option: __( 'Moreno', 'kenzap-pricing' ), availability: __( 'No', 'kenzap-pricing' ) },
    ],
    buttonText: 'Learn more',
    buttonUrl: window.location.origin + '/',
    buttonUrlTarget: false,
};

export const defaultSubBlocks = JSON.stringify( [
    {
        title: __( 'Free Version', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '0',
        subItems: [
            { option: __( 'Lorem Impusm', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 1 },
            { option: __( 'Dolor', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 2 },
            { option: __( 'Sit An', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 3 },
            { option: __( 'Amet', 'kenzap-pricing' ), availability: __( 'No', 'kenzap-pricing' ), key: new Date().getTime() + 4 },
            { option: __( 'Ipsum', 'kenzap-pricing' ), availability: __( 'No', 'kenzap-pricing' ), key: new Date().getTime() + 5 },
            { option: __( 'Moreno', 'kenzap-pricing' ), availability: __( 'No', 'kenzap-pricing' ), key: new Date().getTime() + 6 },
        ],
        buttonText: 'Learn more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 1,
    },
    {
        title: __( 'Entry Level', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '5',
        subItems: [
            { option: __( 'Lorem Impusm', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 1 },
            { option: __( 'Dolor', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 2 },
            { option: __( 'Sit An', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 3 },
            { option: __( 'Amet', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 4 },
            { option: __( 'Ipsum', 'kenzap-pricing' ), availability: __( 'No', 'kenzap-pricing' ), key: new Date().getTime() + 5 },
            { option: __( 'Moreno', 'kenzap-pricing' ), availability: __( 'No', 'kenzap-pricing' ), key: new Date().getTime() + 6 },
        ],
        buttonText: 'Learn more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 2,
    },
    {
        title: __( 'Pro Level', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '10',
        subItems: [
            { option: __( 'Lorem Impusm', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 1 },
            { option: __( 'Dolor', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 2 },
            { option: __( 'Sit An', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 3 },
            { option: __( 'Amet', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 4 },
            { option: __( 'Ipsum', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 5 },
            { option: __( 'Moreno', 'kenzap-pricing' ), availability: __( 'Yes', 'kenzap-pricing' ), key: new Date().getTime() + 6 },
        ],
        buttonText: 'Learn more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 3,
    },
] );

/**
 * Generate inline styles for custom settings of the block
 * @param {Object} attributes - of the block
 * @returns {Node} generated styles
 */
export const getStyles = attributes => {
    const kenzapContanerStyles = {
        maxWidth: `${ attributes.containerMaxWidth === '100%' ? '100%' : attributes.containerMaxWidth + 'px' }`,
        '--maxWidth': `${ attributes.containerMaxWidth === '100%' ? '100vw' : attributes.containerMaxWidth + ' ' } `,
    };

    const vars = {
        '--paddings': `${ attributes.containerPadding }`,
        '--paddingsMin': `${ attributes.containerPadding / 4 }`,
        '--paddingsMinPx': `${ attributes.containerPadding / 4 }px`,
    };

    return {
        vars,
        kenzapContanerStyles,
    };
};

/**
 * Register: a Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'kenzap/pricing-5', {
    title: __( 'Kenzap pricing 5', 'kenzap-pricing' ),
    icon: 'tickets-alt',
    category: 'layout',
    keywords: [
        __( 'pricing', 'kenzap-pricing' ),
    ],
    anchor: true,
    html: true,
    attributes: {
        ...blockProps,

        backgroundColor: {
            type: 'string',
            default: '#f6f6f6',
        },

        containerPadding: {
            type: 'number',
            default: 150,
        },

        titleSize: {
            type: 'number',
            default: 20,
        },

        listDescriptionSize: {
            type: 'number',
            default: 15,
        },

        textColor: {
            type: 'string',
            default: '#850202',
        },

        tableColor: {
            type: 'string',
            default: '#fff',
        },

        buttonColor: {
            type: 'string',
            default: '#850202',
        },

        buttonTextColor: {
            type: 'string',
            default: '#fff',
        },

        bestSellerBlock: {
            type: 'number',
            default: 2,
        },

        cardBorderRadius: {
            type: 'number',
            default: 0,
        },

        buttonBorderRadius: {
            type: 'number',
            default: 0,
        },

        items: {
            type: 'array',
            default: [],
        },

        isFirstLoad: {
            type: 'boolean',
            default: true,
        },

        blockUniqId: {
            type: 'number',
            default: 0,
        },
    },

    edit: ( props ) => {
        if ( props.attributes.items.length === 0 && props.attributes.isFirstLoad ) {
            props.setAttributes( {
                items: [ ...JSON.parse( defaultSubBlocks ) ],
                isFirstLoad: false,
            } );
            // TODO It is very bad solution to avoid low speed working of setAttributes function
            props.attributes.items = JSON.parse( defaultSubBlocks );
            if ( ! props.attributes.blockUniqId ) {
                props.setAttributes( {
                    blockUniqId: new Date().getTime(),
                } );
            }
        }

        return ( <Edit { ...props } /> );
    },

    /**
     * The save function defines the way in which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     * @param {Object} props - attributes
     * @returns {Node} rendered component
     */
    save: function( props ) {
        const {
            className,
            attributes,
        } = props;

        const { vars, kenzapContanerStyles } = getStyles( props.attributes );

        return (
            <div className={ className ? className : '' } style={ vars }>
                <ContainerSave
                    className={ `kenzap-pricing-6 block-${ attributes.blockUniqId }` }
                    attributes={ attributes }
                    style={ vars }
                    withBackground
                    withPadding
                >
                    <div className="kenzap-container" style={ kenzapContanerStyles }>
                        <div className="kp-pricing-table">
                            <div className="kenzap-row">
                                { attributes.items && attributes.items.map( ( item, index ) => (
                                    <div
                                        key={ item.key }
                                        className="kenzap-col-4"
                                    >
                                        <div
                                            className={ `pricing-box ${ attributes.bestSellerBlock === index + 1 ? 'best-seller' : '' }` }
                                            style={ {
                                                borderRadius: attributes.cardBorderRadius,
                                                background: attributes.tableColor,
                                            } }
                                        >
                                            { attributes.bestSellerBlock === index + 1 ? <span style={ { background: attributes.buttonColor, color: attributes.buttonTextColor } } className="ribbon">{ __( 'Best', 'kenzap-pricing' ) }</span> : null }
                                            <RichText.Content
                                                tagName="h3"
                                                value={ item.title }
                                                style={ {
                                                    color: attributes.textColor,
                                                    fontSize: `${ attributes.titleSize }px`,
                                                    lineHeight: `${ attributes.titleSize * 1.4 }px`,
                                                } }
                                            />
                                            <strong
                                                style={ {
                                                    color: attributes.textColor,
                                                } }
                                                className="kp-price"
                                            >
                                                <sup style={ { color: attributes.textColor } }>{ item.currency }</sup>
                                                { item.price }
                                            </strong>

                                            <ul>
                                                { item.subItems.map( subItem => (
                                                    <li
                                                        key={ subItem.key }
                                                        style={ {
                                                            color: attributes.textColor,
                                                            fontSize: `${ attributes.listDescriptionSize }px`,
                                                            lineHeight: `${ attributes.listDescriptionSize * 1.74 }px`,
                                                        } }
                                                    >
                                                        { subItem.option } <strong style={ { color: attributes.textColor } }>{ subItem.availability }</strong>
                                                    </li>
                                                ) ) }
                                            </ul>

                                            <a
                                                href={ item.buttonUrl ? item.buttonUrl : 'javascript:;' }
                                                target={ item.buttonUrlTarget ? '_blank' : '_self' }
                                                style={ {
                                                    background: attributes.buttonColor,
                                                    color: attributes.buttonTextColor,
                                                    borderRadius: attributes.buttonBorderRadius,
                                                    border: `1px solid ${ attributes.buttonColor }`,
                                                } }
                                                className="kp-link"
                                            >
                                                <RichText.Content
                                                    value={ item.buttonText }
                                                />
                                            </a>
                                        </div>
                                    </div>
                                ) ) }
                            </div>
                        </div>
                    </div>
                </ContainerSave>
            </div>
        );
    },
} );
