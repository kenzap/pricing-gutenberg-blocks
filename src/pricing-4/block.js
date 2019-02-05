/**
 * BLOCK: pricing-4
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

export const defaultSubBlocks = JSON.stringify( [
    {
        title: __( 'INDIVIDUAL', 'kenzap-pricing' ),
        period: __( 'Yearly', 'kenzap-pricing' ),
        price: '$86',
        cents: '.99',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit ametv</li>' +
        '<li>Consectetur adipisicing elit</li>' +
        '<li>Incididunt ut labore et dolore</li>' +
        '<li>Sed do eiusmod tempor</li>',
        ctaText: 'GET NOW',
        ctaUrl: window.location.origin + '/',
        ctaUrlTarget: false,
        key: new Date().getTime() + 1,
        id: 'monthly',
    },
    {
        title: __( 'BUSINESS', 'kenzap-pricing' ),
        period: __( 'Yearly', 'kenzap-pricing' ),
        price: '$280',
        cents: '.99',
        subDescription: '' +
        '<li>Lorem ipsum dolor sit ametv</li>' +
        '<li>Consectetur adipisicing elit</li>' +
        '<li>Incididunt ut labore et dolore</li>' +
        '<li>Sed do eiusmod tempor</li>',
        ctaText: 'GET NOW',
        ctaUrl: window.location.origin + '/',
        ctaUrlTarget: false,
        key: new Date().getTime() + 2,
        id: 'yearly',
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
        '--gradientColor': attributes.gradientColor,
        '--buttonBorderRadius': attributes.buttonBorderRadius,
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
registerBlockType( 'kenzap/pricing-4', {
    title: __( 'Kenzap pricing 4', 'kenzap-pricing' ),
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
            default: '#f9fcfe',
        },

        title: {
            type: 'string',
            default: __( 'Lorem ipsum dolor sit ametv lorem ipsum dolor', 'kenzap-pricin' ),
        },

        titleColor: {
            type: 'string',
            default: '#000',
        },

        organization: {
            type: 'string',
            default: __( 'Kenzap Cloud', 'kenzap-pricing' ),
        },

        organizationColor: {
            type: 'string',
            default: '#a2a4a5',
        },

        organizationSize: {
            type: 'number',
            default: 18,
        },

        description: {
            type: 'string',
            default: __( 'Lorem ipsum dolor sit ametv lorem ipsum dolor sit ametv lorem ipsum dolor sit ametv.', 'kenzap-pricing' ),
        },

        descriptionColor: {
            type: 'string',
            default: '#666666',
        },

        descriptionSize: {
            type: 'string',
            default: 17,
        },

        cardBackgroundColor: {
            type: 'string',
            default: '#fff',
        },

        cardTitleSize: {
            type: 'number',
            default: 18,
        },

        periodColor: {
            type: 'string',
            default: '#b1b1b1',
        },

        periodSize: {
            type: 'number',
            default: 17,
        },

        listDescriptionSize: {
            type: 'number',
            default: 17,
        },

        textColor: {
            type: 'string',
            default: '#282828',
        },

        ctaTextColor: {
            type: 'string',
            default: '#282828',
        },

        cardBorderRadius: {
            type: 'number',
            default: 0,
        },

        buttonBorderRadius: {
            type: 'number',
            default: 23,
        },

        gradientColor: {
            type: 'string',
            default: '#0c5adb',
        },

        items: {
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
                    className={ `kenzap-pricing-4 block-${ attributes.blockUniqId }` }
                    attributes={ attributes }
                    style={ vars }
                    withBackground
                    withPadding
                >
                    <div className="kenzap-container" style={ kenzapContanerStyles }>
                        <div className="kp-pricing-table">
                            <div className="kenzap-row">
                                <div className="kenzap-col-6">
                                    <h2>
                                        <RichText.Content
                                            tagName="span"
                                            className="organization"
                                            value={ attributes.organization }
                                            style={ {
                                                fontSize: `${ attributes.organizationSize }px`,
                                                lineHeight: `${ attributes.organizationSize }px`,
                                                color: attributes.organizationColor,
                                            } }
                                        />
                                        <RichText.Content
                                            tagName="span"
                                            value={ attributes.title }
                                            style={ {
                                                color: attributes.titleColor,
                                            } }
                                        />
                                    </h2>
                                    <RichText.Content
                                        tagName="p"
                                        value={ attributes.description }
                                        style={ {
                                            fontSize: `${ attributes.descriptionSize }px`,
                                            lineHeight: `${ attributes.descriptionSize * 1.9 }px`,
                                            color: attributes.descriptionColor,
                                        } }
                                    />
                                    { attributes.isFilterShow &&
                                        <div className="tabs-nav">
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
                                </div>
                                <div className="kenzap-col-6">
                                    <div className="tabs-content">
                                        { attributes.items && attributes.items.map( ( item, index ) => (
                                            <div
                                                id={ item.id }
                                                key={ item.key }
                                                className={ 'tab-content' }
                                            >
                                                <div
                                                    className="pricing-box"
                                                    style={ {
                                                        background: attributes.cardBackgroundColor,
                                                        borderRadius: attributes.cardBorderRadius,
                                                    } }
                                                >
                                                    <h3>
                                                        <RichText.Content
                                                            tagName="span"
                                                            value={ item.title }
                                                            style={ {
                                                                color: attributes.textColor,
                                                                fontSize: `${ attributes.cardTitleSize }px`,
                                                            } }
                                                        />
                                                        <RichText.Content
                                                            tagName="span"
                                                            value={ item.period }
                                                            className="period"
                                                            style={ {
                                                                color: attributes.periodColor,
                                                                fontSize: `${ attributes.periodSize }px`,
                                                                lineHeight: `${ attributes.periodSize * 1.9 }px`,
                                                            } }
                                                        />
                                                    </h3>

                                                    <strong
                                                        style={ {
                                                            lineHeight: 1.2,
                                                            color: attributes.textColor,
                                                        } }
                                                        className="kp-price"
                                                    >
                                                        { item.price }
                                                        <sup style={ {
                                                            color: attributes.textColor,
                                                        } }>{ item.cents }</sup>
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
                                                        className="kp-link"
                                                        style={ {
                                                            borderRadius: attributes.buttonBorderRadius,
                                                        } }
                                                    >
                                                        <span>{ item.ctaText }</span>
                                                    </a>
                                                </div>
                                            </div>
                                        ) ) }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContainerSave>
            </div>
        );
    },
} );
