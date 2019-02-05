/**
 * BLOCK: pricing-2
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
    title: __( 'Beginner', 'kenzap-pricing' ),
    currency: __( '$', 'kenzap-pricing' ),
    price: '25',
    subDescription: '' +
    '<li>Lorem ipsum dolor sit ametv</li>' +
    '<li>Consectetur adipisicing elit</li>' +
    '<li>Incididunt ut labore et dolore</li>' +
    '<li>Sed do eiusmod tempor</li>',
    ctaText: 'View Offer',
    ctaUrl: window.location.origin + '/',
    ctaUrlTarget: false,
};

export const defaultSubBlocks = JSON.stringify( [
    {
        title: __( 'Beginner', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '25',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit ametv</li>' +
        '<li>Consectetur adipisicing elit</li>' +
        '<li>Incididunt ut labore et dolore</li>' +
        '<li>Sed do eiusmod tempor</li>',
        ctaText: 'View Offer',
        ctaUrl: window.location.origin + '/',
        ctaUrlTarget: false,
        key: new Date().getTime() + 1,
    },
    {
        title: __( 'Strater', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '60',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit ametv</li>' +
        '<li>Consectetur adipisicing elit</li>' +
        '<li>Incididunt ut labore et dolore</li>' +
        '<li>Sed do eiusmod tempor</li>',
        ctaText: 'View Offer',
        ctaUrl: window.location.origin + '/',
        ctaUrlTarget: false,
        key: new Date().getTime() + 2,
    },
    {
        title: __( 'Professional', 'kenzap-pricing' ),
        currency: __( '$', 'kenzap-pricing' ),
        price: '99',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit ametv</li>' +
        '<li>Consectetur adipisicing elit</li>' +
        '<li>Incididunt ut labore et dolore</li>' +
        '<li>Sed do eiusmod tempor</li>',
        ctaText: 'View Offer',
        ctaUrl: window.location.origin + '/',
        ctaUrlTarget: false,
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
        '--textColor': attributes.textColor,
        '--ctaTextColor': attributes.ctaTextColor,
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
registerBlockType( 'kenzap/pricing-2', {
    title: __( 'Kenzap pricing 2', 'kenzap-pricing' ),
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

        titleSize: {
            type: 'number',
            default: 25,
        },

        listDescriptionSize: {
            type: 'number',
            default: 13,
        },

        textColor: {
            type: 'string',
            default: '#313131',
        },

        ctaTextColor: {
            type: 'string',
            default: '#282828',
        },

        cardBorderRadius: {
            type: 'number',
            default: 50,
        },

        cardColor: {
            type: 'string',
            default: '#fcb900',
        },

        cardFeaturedColor: {
            type: 'string',
            default: '#8ed1fc',
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
                    className={ `kenzap-pricing-2 block-${ attributes.blockUniqId }` }
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
                                            className="pricing-box"
                                            style={ {
                                                borderRadius: attributes.cardBorderRadius,
                                                background: ( index + 1 ) % 2 === 0 ? attributes.cardFeaturedColor : attributes.cardColor,
                                            } }
                                        >
                                            <RichText.Content
                                                tagName="h3"
                                                value={ item.title }
                                                style={ {
                                                    color: attributes.textColor,
                                                    fontSize: `${ attributes.titleSize }px`,
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
                                            </strong>

                                            <RichText.Content
                                                tagName="ul"
                                                value={ item.subDescription }
                                                style={ {
                                                    color: attributes.textColor,
                                                    fontSize: `${ attributes.listDescriptionSize }px`,
                                                    lineHeight: `${ attributes.listDescriptionSize * 2 }px`,
                                                } }
                                            />
                                            <a
                                                href={ item.ctaUrl ? item.ctaUrl : 'javascript:;' }
                                                target={ item.ctaUrlTarget ? '_blank' : '_self' }
                                                style={ { color: attributes.ctaTextColor } }
                                                className="kp-link"
                                            >
                                                { item.ctaText }
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
