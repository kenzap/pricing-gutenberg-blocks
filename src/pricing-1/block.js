/**
 * BLOCK: pricing-1
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
    title: __( 'BASIC', 'kenzap-pricing' ),
    description: __( 'Start hosting right now without installation fee.', 'kenzap-pricing' ),
    currency: __( '$', 'kenzap-pricing' ),
    price: '100',
    period: __( 'mo', 'kenzap-pricing' ),
    iconMediaId: '',
    iconMediaUrl: '',
    subDescription: '' +
    '<li>Free Installation</li>' +
    '<li>20 WordPress Themes Included</li>' +
    '<li>1 Month of Kenzap Cloud</li>' +
    '<li>1 Month of Free Support</li>' +
    '<li>Search Engine Optimization</li>',
    buttonText: 'Read more',
    buttonUrl: window.location.origin + '/',
    buttonUrlTarget: false,
};

export const defaultSubBlocks = JSON.stringify( [
    {
        title: __( 'BASIC', 'kenzap-pricing' ),
        description: __( 'Start hosting right now without installation fee.', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '100',
        period: __( 'mo', 'kenzap-pricing' ),
        iconMediaId: '',
        iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-1/pricing-img-1.png',
        subDescription: '' +
        '<li>Free Installation</li>' +
        '<li>20 WordPress Themes Included</li>' +
        '<li>1 Month of Kenzap Cloud</li>' +
        '<li>1 Month of Free Support</li>' +
        '<li>Search Engine Optimization</li>',
        buttonText: 'Read more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 1,
    },
    {
        title: __( 'AGENCY', 'kenzap-pricing' ),
        description: __( 'Start hosting right now without installation fee.', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '125',
        period: __( 'mo', 'kenzap-pricing' ),
        iconMediaId: '',
        iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-1/pricing-img-2.png',
        subDescription: '' +
        '<li>Free Installation</li>' +
        '<li>50 WordPress Themes Included</li>' +
        '<li>2 Month of Kenzap Cloud</li>' +
        '<li>2 Month of Free Support</li>' +
        '<li>Search Engine Optimization</li>',
        buttonText: 'Learn more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 2,
    },
    {
        title: __( 'ADVANCED', 'kenzap-pricing' ),
        description: __( 'Start hosting right now without installation fee.', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '230',
        period: __( 'mo', 'kenzap-pricing' ),
        iconMediaId: '',
        iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-1/pricing-img-3.png',
        subDescription: '' +
        '<li>Free Installation</li>' +
        '<li>200 WordPress Themes Included</li>' +
        '<li>5 Month of Kenzap Cloud</li>' +
        '<li>5 Month of Free Support</li>' +
        '<li>Search Engine Optimization</li>',
        buttonText: 'Read more',
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
registerBlockType( 'kenzap/pricing-1', {
    title: __( 'Kenzap pricing 1', 'kenzap-pricing' ),
    icon: 'tickets-alt',
    category: 'layout',
    keywords: [
        __( 'pricing', 'kenzap-pricing' ),
        __( 'price table', 'kenzap-pricing' ),
    ],
    anchor: true,
    html: true,
    attributes: {
        ...blockProps,

        backgroundColor: {
            type: 'string',
            default: '#1b3795',
        },

        titleSize: {
            type: 'number',
            default: 20,
        },

        descriptionSize: {
            type: 'number',
            default: 15,
        },

        listDescriptionSize: {
            type: 'number',
            default: 15,
        },

        iconSize: {
            type: 'number',
            default: 100,
        },

        cardBorderRadius: {
            type: 'number',
            default: 0,
        },

        buttonBorderRadius: {
            type: 'number',
            default: 4,
        },

        textColor: {
            type: 'string',
            default: '#fff',
        },

        buttonColor: {
            type: 'string',
            default: '#0abc5f',
        },

        buttonTextColor: {
            type: 'string',
            default: '#fff',
        },

        bestSellerBlock: {
            type: 'number',
            default: 2,
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
                    className={ `kenzap-pricing-1 block-${ attributes.blockUniqId }` }
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
                                            } }
                                        >
                                            { attributes.iconSize > 0 && 
                                            <img
                                                src={ item.iconMediaUrl }
                                                alt={ item.title.replace( /<(?:.|\n)*?>/gm, '' ) }
                                                style={ { height: attributes.iconSize } }
                                            /> }
                                            <RichText.Content
                                                tagName="h3"
                                                value={ item.title }
                                                style={ {
                                                    color: attributes.textColor,
                                                    fontSize: `${ attributes.titleSize }px`,
                                                    lineHeight: `${ attributes.titleSize * 1.4 }px`,
                                                } }
                                            />
                                            <RichText.Content
                                                tagName="p"
                                                value={ item.description }
                                                style={ {
                                                    color: attributes.textColor,
                                                    fontSize: `${ attributes.descriptionSize }px`,
                                                    lineHeight: `${ attributes.descriptionSize * 1.74 }px`,
                                                } }
                                            />
                                            <strong
                                                style={ {
                                                    lineHeight: 1.2,
                                                    color: attributes.textColor,
                                                } }
                                                className="kp-price"
                                            >
                                                <sup style={ { color: attributes.textColor } }>{ item.currency }</sup>
                                                { item.price }
                                                <sub style={ { color: attributes.textColor } }>/{ item.period }</sub>
                                            </strong>

                                            <RichText.Content
                                                tagName="ul"
                                                value={ item.subDescription }
                                                style={ {
                                                    color: attributes.textColor,
                                                    fontSize: `${ attributes.listDescriptionSize }px`,
                                                    lineHeight: `${ attributes.listDescriptionSize * 1.74 }px`,
                                                } }
                                            />
                                            <a
                                                href={ item.buttonUrl ? item.buttonUrl : 'javascript:;' }
                                                target={ item.buttonUrlTarget ? '_blank' : '_self' }
                                                style={ {
                                                    "--bbc": attributes.buttonColor,
                                                    "--btc": attributes.buttonTextColor,
                                                    borderRadius: attributes.buttonBorderRadius,
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
