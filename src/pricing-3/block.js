/**
 * BLOCK: pricing-3
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
    title: __( 'PRICING A', 'kenzap-pricing' ),
    currency: __( '$', 'kenzap-pricing' ),
    price: '19.99',
    period: __( 'mo', 'kenzap-pricing' ),
    iconMediaId: '',
    iconMediaUrl: '',
    subDescription: '' +
    '<li>Lorem ipsum dolor sit</li>' +
    '<li>Consectetur adipisicing</li>' +
    '<li>Incididunt ut labore et\n</li>' +
    '<li>Sed do eiusmod tempor</li>' +
    '<li>24/7 support</li>',
    buttonText: 'Learn more',
    buttonUrl: window.location.origin + '/',
    buttonUrlTarget: false,
};

export const defaultSubBlocks = JSON.stringify( [
    {
        title: __( 'PRICING A', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '19.99',
        period: __( 'mo', 'kenzap-pricing' ),
        iconMediaId: '',
        iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-3/pricing-img-1.png',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit</li>' +
        '<li>Consectetur adipisicing</li>' +
        '<li>Incididunt ut labore et\n</li>' +
        '<li>Sed do eiusmod tempor</li>' +
        '<li>24/7 support</li>',
        buttonText: 'Learn more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 1,
    },
    {
        title: __( 'PRICING B', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '59.99',
        period: __( 'mo', 'kenzap-pricing' ),
        iconMediaId: '',
        iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-3/pricing-img-2.png',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit</li>' +
        '<li>Consectetur adipisicing</li>' +
        '<li>Incididunt ut labore et\n</li>' +
        '<li>Sed do eiusmod tempor</li>' +
        '<li>24/7 support</li>',
        buttonText: 'Learn more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 2,
    },
    {
        title: __( 'PRICING C', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '99.99',
        period: __( 'mo', 'kenzap-pricing' ),
        iconMediaId: '',
        iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-3/pricing-img-3.png',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit</li>' +
        '<li>Consectetur adipisicing</li>' +
        '<li>Incididunt ut labore et\n</li>' +
        '<li>Sed do eiusmod tempor</li>' +
        '<li>24/7 support</li>',
        buttonText: 'Learn more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 3,
    },
] );

export const defaultBusinessSubBlocks = JSON.stringify( [
    {
        title: __( 'PRICING A', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '29.99',
        period: __( 'Monthly', 'kenzap-pricing' ),
        iconMediaId: '',
        iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-3/pricing-img-1.png',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit</li>' +
        '<li>Consectetur adipisicing</li>' +
        '<li>Incididunt ut labore et\n</li>' +
        '<li>Sed do eiusmod tempor</li>' +
        '<li>24/7 support</li>',
        buttonText: 'Learn more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 111,
    },
    {
        title: __( 'PRICING B', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '69.99',
        period: __( 'Monthly', 'kenzap-pricing' ),
        iconMediaId: '',
        iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-3/pricing-img-2.png',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit</li>' +
        '<li>Consectetur adipisicing</li>' +
        '<li>Incididunt ut labore et\n</li>' +
        '<li>Sed do eiusmod tempor</li>' +
        '<li>24/7 support</li>',
        buttonText: 'Learn more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 333,
    },
    {
        title: __( 'PRICING C', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '209.99',
        period: __( 'Monthly', 'kenzap-pricing' ),
        iconMediaId: '',
        iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-3/pricing-img-3.png',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit</li>' +
        '<li>Consectetur adipisicing</li>' +
        '<li>Incididunt ut labore et\n</li>' +
        '<li>Sed do eiusmod tempor</li>' +
        '<li>24/7 support</li>',
        buttonText: 'Learn more',
        buttonUrl: window.location.origin + '/',
        buttonUrlTarget: false,
        key: new Date().getTime() + 222,
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
        '--blueColor': attributes.blueColor,
        '--textColorBestSeller': attributes.textColorBestSeller,
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
registerBlockType( 'kenzap/pricing-3', {
    title: __( 'Kenzap pricing 3', 'kenzap-pricing' ),
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
            default: '#f8fafe',
        },

        iconSize: {
            type: 'number',
            default: 110,
        },

        titleSize: {
            type: 'number',
            default: 24,
        },

        listDescriptionSize: {
            type: 'number',
            default: 18,
        },

        textColor: {
            type: 'string',
            default: '#192225',
        },

        textColorBestSeller: {
            type: 'string',
            default: '#fff',
        },

        blueColor: {
            type: 'string',
            default: '#0c5adb',
        },

        bestSellerBlock: {
            type: 'number',
            default: 2,
        },

        bestSellerBusinessBlock: {
            type: 'number',
            default: 2,
        },

        cardBorderRadius: {
            type: 'number',
            default: 0,
        },

        buttonBorderRadius: {
            type: 'number',
            default: 30,
        },

        items: {
            type: 'array',
            default: [],
        },

        itemsBusiness: {
            type: 'array',
            default: [],
        },

        tableTypes: {
            type: 'object',
            default: {
                individual: __( 'Individual', 'kenzap-pricing' ),
                business: __( 'Business', 'kenzap-pricing' ),
            },
        },

        isFilterShow: {
            type: 'boolean',
            default: true,
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
                itemsBusiness: [ ...JSON.parse( defaultBusinessSubBlocks ) ],
                isFirstLoad: false,
            } );
            props.attributes.items = JSON.parse( defaultSubBlocks );
            props.attributes.itemsBusiness = JSON.parse( defaultBusinessSubBlocks );
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

        const getItems = ( itemsType, bestSellerBlock ) => (
            <div className="kenzap-row">
                { attributes[ itemsType ] && attributes[ itemsType ].map( ( item, index ) => (
                    <div
                        key={ item.key }
                        className="kenzap-col-4"
                    >
                        <div
                            className={ `pricing-box ${ bestSellerBlock === index + 1 ? 'best-seller' : '' }` }
                            style={ {
                                background: bestSellerBlock === index + 1 ? attributes.blueColor : '#fff',
                                borderRadius: attributes.cardBorderRadius,
                            } }
                        >
                            <RichText.Content
                                tagName="h3"
                                value={ item.title }
                                style={ {
                                    color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.textColor,
                                    fontSize: `${ attributes.titleSize }px`,
                                    lineHeight: `${ attributes.titleSize * 1.17 }px`,
                                } }
                            />
                            { attributes.iconSize > 0 &&
                            <img
                                src={ item.iconMediaUrl }
                                alt={ item.title.replace( /<(?:.|\n)*?>/gm, '' ) }
                                style={ { height: `${ attributes.iconSize }px` } }
                            /> }
                            <strong
                                style={ {
                                    lineHeight: 1.2,
                                    color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.blueColor,
                                } }
                                className="kp-price"
                            >
                                <sup style={ { color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.blueColor } }>{ item.currency }</sup>
                                { item.price }
                                <sub style={ { color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.blueColor } }>/{ item.period }</sub>
                            </strong>

                            <RichText.Content
                                tagName="ul"
                                value={ item.subDescription }
                                style={ {
                                    color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.textColor,
                                    fontSize: `${ attributes.listDescriptionSize }px`,
                                } }
                            />
                            <a
                                href={ item.buttonUrl ? item.buttonUrl : 'javascript:;' }
                                target={ item.buttonUrlTarget ? '_blank' : '_self' }
                                style={ {

                                    '--blueColor': attributes.blueColor,
                                    borderRadius: attributes.buttonBorderRadius,
                                } }
                                className={ ` kp-link ${ bestSellerBlock === index + 1 ? 'inverse' : attributes.blueColor }` }
                            >
                                { item.buttonText }
                            </a>
                        </div>
                    </div>
                ) ) }
            </div>
        );

        return (
            <div className={ className ? className : '' } style={ vars }>
                <ContainerSave
                    className={ `kenzap-pricing-3 block-${ attributes.blockUniqId }` }
                    attributes={ attributes }
                    style={ vars }
                    withBackground
                    withPadding
                >
                    <div className="kenzap-container" style={ kenzapContanerStyles }>
                        <div className="kp-pricing-table">
                            { attributes.isFilterShow &&
                                <div className="tabs-nav" style={ { background: attributes.blueColor } }>
                                    <ul>
                                        <li className="active">
                                            <a href="#monthly">{ attributes.tableTypes.individual }</a>
                                        </li>
                                        <li className="">
                                            <a href="#yearly">{ attributes.tableTypes.business }</a>
                                        </li>
                                    </ul>
                                </div>
                            }
                            <div className="tabs-content">
                                <div id="monthly" className="tab-content" style={ { display: 'block' } }>
                                    { getItems( 'items', attributes.bestSellerBlock ) }
                                </div>
                                <div id="yearly" className="tab-content">
                                    { getItems( 'itemsBusiness', attributes.bestSellerBusinessBlock ) }
                                </div>
                            </div>

                        </div>
                    </div>
                </ContainerSave>
            </div>
        );
    },
} );
