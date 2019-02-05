
const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const { RichText, InspectorControls, PanelColorSettings, MediaUpload } = wp.editor;
const { RangeControl, PanelBody, Popover, TextControl, ToggleControl, Button, ButtonGroup, BaseControl, CheckboxControl } = wp.components;

import { defaultItem, getStyles } from './block';

import { InspectorContainer, ContainerEdit } from '../commonComponents/container/container';
import { Plus } from '../commonComponents/icons/plus';

/**
 * Keys for new blocks
 * @type {number}
 */
let key = 0;

/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * The "edit" property must be a valid function.
 * @param {Object} props - attributes
 * @returns {Node} rendered component
 */
export default class Edit extends Component {
    state = {
        isButtonPopupVisibleIndex: -1,
        showError: false,
        itemsType: 'items',
    };

    timerId = 0;

    /**
     * Add a new item to list with default fields
     */
    addItem = () => {
        clearTimeout( this.timerId );
        if ( this.props.attributes[ this.state.itemsType ].length >= 3 ) {
            this.setState( { showError: true } );
            this.timerId = setTimeout( () => {
                this.setState( { showError: false } );
                clearTimeout( this.timerId );
            }, 3000 );
        } else {
            key++;
            this.props.setAttributes( {
                [ this.state.itemsType ]: [ ...this.props.attributes[ this.state.itemsType ], {
                    ...defaultItem,
                    title: defaultItem.title + ' ' + ( key ),
                    key: 'new ' + new Date().getTime(),
                    iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-3/pricing-img-' + Math.round( 1 - 0.5 + ( Math.random() * ( 3 - 1 + 1 ) ) ) + '.png',
                } ],
            } );
        }
    };

    /**
     * Change any property of item
     * @param {string} property - editable field
     * @param {string} value - for field
     * @param {number} index - of items array
     * @param {Array<any>} itemsType - which is array need to modify
     */
    onChangePropertyItem = ( property, value, index, itemsType ) => {
        const items = itemsType === 'items' ? [ ...this.props.attributes.items ] : [ ...this.props.attributes.itemsBusiness ];
        if ( ! items[ index ] ) {
            return;
        }
        items[ index ][ property ] = value;
        this.props.setAttributes( { [ itemsType === 'items' ? 'items' : 'itemsBusiness' ]: items } );
    };

    /**
     * Remove item
     * It also add default item if we remove all elements from array
     * @param {number} index - of item
     */
    removeItem = ( index ) => {
        const items = [ ...this.props.attributes[ this.state.itemsType ] ];
        if ( items.length === 1 ) {
            this.props.setAttributes( {
                [ this.state.itemsType ]: [ {
                    ...defaultItem,
                    iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-3/pricing-img-' + Math.round( 1 - 0.5 + ( Math.random() * ( 3 - 1 + 1 ) ) ) + '.png',

                } ],
            } );
        } else {
            items.splice( index, 1 );
            this.props.setAttributes( { [ this.state.itemsType ]: items } );
        }
    };

    render() {
        const {
            className,
            attributes,
            setAttributes,
            isSelected,
        } = this.props;

        const { vars, kenzapContanerStyles } = getStyles( attributes );

        const getItems = ( itemsType, bestSellerBlock ) => (
            <div className="kenzap-row">
                { attributes[ itemsType ] && attributes[ itemsType ].map( ( item, index ) => (
                    <div
                        key={ item.key }
                        className="kenzap-col-4"
                    >
                        <button className="remove" onClick={ () => this.removeItem( index ) }>
                            <span className="dashicons dashicons-no" />
                        </button>
                        <div
                            className={ `pricing-box ${ bestSellerBlock === index + 1 ? 'best-seller' : '' }` }
                            style={ {
                                background: bestSellerBlock === index + 1 ? attributes.blueColor : '#fff',
                                borderRadius: attributes.cardBorderRadius,
                            } }
                        >
                            <RichText
                                tagName="h3"
                                placeholder={ __( 'Title', 'kenzap-pricing' ) }
                                value={ item.title }
                                onChange={ ( value ) => this.onChangePropertyItem( 'title', value, index, itemsType ) }
                                style={ {
                                    color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.textColor,
                                    fontSize: `${ attributes.titleSize }px`,
                                    lineHeight: `${ attributes.titleSize * 1.17 }px`,
                                } }
                            />
                            <MediaUpload
                                onSelect={ ( media ) => {
                                    this.onChangePropertyItem( 'iconMediaId', media.id, index, itemsType );
                                    this.onChangePropertyItem( 'iconMediaUrl', media.url, index, itemsType );
                                } }
                                value={ item.iconMediaId }
                                allowedTypes={ [ 'image', 'image/svg+xml' ] }
                                render={ ( props ) => (
                                    <img
                                        src={ item.iconMediaUrl }
                                        alt={ item.title.replace( /<(?:.|\n)*?>/gm, '' ) }
                                        style={ { height: `${ attributes.iconSize }px` } }
                                        onClick={ props.open }
                                        role="presentation"
                                    />
                                ) }
                            />
                            <strong
                                style={ {
                                    color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.blueColor,
                                    lineHeight: 1.25,
                                } }
                                className="kp-price"
                            >
                                <sup>
                                    <input
                                        value={ item.currency }
                                        onChange={ ( event ) => {
                                            const value = event.target.value;
                                            this.onChangePropertyItem( 'currency', value, index, itemsType );
                                        } }
                                        placeholder={ __( '$', 'kenzap-pricing' ) }
                                        style={ {
                                            width: `${ ( item.currency.length === 0 ? 1 : item.currency.length ) * 20 }px`,
                                            color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.blueColor,
                                        } }
                                    />
                                </sup>
                                <input
                                    value={ item.price }
                                    onChange={ ( event ) => {
                                        const value = event.target.value;
                                        this.onChangePropertyItem( 'price', value, index, itemsType );
                                    } }
                                    placeholder={ __( '19.99', 'kenzap-pricing' ) }
                                    style={ {
                                        width: `${ ( item.price.length === 0 ? 5 : item.price.length ) * 25 }px`,
                                        color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.blueColor,
                                    } }
                                />
                                <sub>/
                                    <input
                                        value={ item.period }
                                        onChange={ ( event ) => {
                                            const value = event.target.value;
                                            this.onChangePropertyItem( 'period', value, index, itemsType );
                                        } }
                                        placeholder={ __( 'mo', 'kenzap-pricing' ) }
                                        style={ {
                                            width: `${ ( item.period.length === 0 ? 3 : item.period.length + 1 ) * 10.5 }px`,
                                            color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.blueColor,
                                        } }
                                    />
                                </sub>
                            </strong>
                            <RichText
                                tagName="ul"
                                placeholder={ __( 'Description', 'kenzap-pricing' ) }
                                value={ item.subDescription }
                                onChange={ ( value ) => this.onChangePropertyItem( 'subDescription', value, index, itemsType ) }
                                multiline="li"
                                style={ {
                                    color: bestSellerBlock === index + 1 ? attributes.textColorBestSeller : attributes.textColor,
                                    fontSize: `${ attributes.listDescriptionSize }px`,
                                } }
                            />
                            <a
                                onClick={ () => this.setState( { isButtonPopupVisibleIndex: item.key } ) }
                                style={ {
                                    background: bestSellerBlock === index + 1 ? '#fff' : attributes.blueColor,
                                    borderRadius: attributes.buttonBorderRadius,
                                } }
                                className="kp-link"
                            >
                                <input
                                    value={ item.buttonText }
                                    onChange={ ( event ) => {
                                        const value = event.target.value;
                                        this.onChangePropertyItem( 'buttonText', value, index, itemsType );
                                    } }
                                    style={ {
                                        width: `${ 15 * item.buttonText.length * 0.6 }px`,
                                        color: bestSellerBlock === index + 1 ? attributes.blueColor : '#fff',
                                    } }
                                />
                            </a>

                            { this.state.isButtonPopupVisibleIndex === item.key &&
                            <Popover
                                onClickOutside={ () => this.setState( { isButtonPopupVisibleIndex: -1 } ) }
                                focusOnMount={ false }
                                className="link-popover"
                            >
                                <TextControl
                                    label={ __( 'Specify Link', 'kenzap-pricing' ) }
                                    placeholder={ __( 'http://www.example.com' ) }
                                    value={ item.buttonUrl }
                                    className="link-text"
                                    onChange={ ( value ) => {
                                        this.onChangePropertyItem( 'buttonUrl', value, index, itemsType );
                                    } }
                                />
                                <ToggleControl
                                    label={ __( 'Settings' ) }
                                    help={ item.buttonUrlTarget ? __( 'Open link in new window.', 'kenzap-pricing' ) : __( 'Open link in current window', 'kenzap-pricing' ) }
                                    checked={ item.buttonUrlTarget }
                                    onChange={ ( value ) => {
                                        this.onChangePropertyItem( 'buttonUrlTarget', value, index, itemsType );
                                    } }
                                />
                            </Popover>
                            }
                        </div>
                    </div>
                ) ) }
            </div>
        );

        return (
            <div>
                <InspectorControls>
                    <PanelBody
                        title={ __( 'General', 'kenzap-pricing' ) }
                        initialOpen={ false }
                    >
                        <CheckboxControl
                            label={ __( 'Show the table type selector', 'kenzap-pricing' ) }
                            checked={ attributes.isFilterShow }
                            help={ __( 'Will be shown only individual price type', 'kenzap-pricing' ) }
                            onChange={ ( isFilterShow ) => {
                                setAttributes( { isFilterShow } );
                                this.setState( { itemsType: 'items' } );
                            } }
                        />
                        { attributes.isFilterShow &&
                            <BaseControl
                                label={ __( 'Table type', 'kenzap-pricing' ) }
                            >
                                <ButtonGroup>
                                    <Button
                                        isDefault
                                        isPrimary={ this.state.itemsType === 'items' }
                                        onClick={ () => this.setState( { itemsType: 'items' } ) }
                                    >
                                        { attributes.tableTypes.individual }
                                    </Button>
                                    <Button
                                        isDefault
                                        isPrimary={ this.state.itemsType === 'itemsBusiness' }
                                        onClick={ () => this.setState( { itemsType: 'itemsBusiness' } ) }
                                    >
                                        { attributes.tableTypes.business }
                                    </Button>
                                </ButtonGroup>
                            </BaseControl>
                        }

                        <RangeControl
                            label={ __( 'Title Size', 'kenzap-pricing' ) }
                            value={ attributes.titleSize }
                            onChange={ ( titleSize ) => setAttributes( { titleSize } ) }
                            min={ 10 }
                            max={ 130 }
                        />
                        <RangeControl
                            label={ __( 'Icon Size', 'kenzap-pricing' ) }
                            value={ attributes.iconSize }
                            onChange={ ( iconSize ) => setAttributes( { iconSize } ) }
                            min={ 0 }
                            max={ 200 }
                        />
                        <RangeControl
                            label={ __( 'Description Size', 'kenzap-pricing' ) }
                            value={ attributes.listDescriptionSize }
                            onChange={ ( listDescriptionSize ) => setAttributes( { listDescriptionSize } ) }
                            min={ 10 }
                            max={ 130 }
                        />
                        <RangeControl
                            label={ __( 'First Featured Table', 'kenzap-pricing' ) }
                            value={ attributes.bestSellerBlock }
                            onChange={ ( bestSellerBlock ) => setAttributes( { bestSellerBlock } ) }
                            min={ 1 }
                            max={ attributes.items.length }
                        />
                        <RangeControl
                            label={ __( 'Second Featured Table', 'kenzap-pricing' ) }
                            value={ attributes.bestSellerBusinessBlock }
                            onChange={ ( bestSellerBusinessBlock ) => setAttributes( { bestSellerBusinessBlock } ) }
                            min={ 1 }
                            max={ attributes.itemsBusiness.length }
                        />

                        <RangeControl
                            label={ __( 'Table Border', 'kenzap-pricing' ) }
                            value={ attributes.cardBorderRadius }
                            onChange={ ( cardBorderRadius ) => setAttributes( { cardBorderRadius } ) }
                            min={ 0 }
                            max={ 100 }
                        />
                        <RangeControl
                            label={ __( 'Button Border', 'kenzap-pricing' ) }
                            value={ attributes.buttonBorderRadius }
                            onChange={ ( buttonBorderRadius ) => setAttributes( { buttonBorderRadius } ) }
                            min={ 0 }
                            max={ 100 }
                        />
                    </PanelBody>

                    <PanelColorSettings
                        title={ __( 'Colors', 'kenzap-pricing' ) }
                        initialOpen={ false }
                        colorSettings={ [
                                {
                                    value: attributes.textColor,
                                    onChange: ( value ) => {
                                        return setAttributes( { textColor: value } );
                                    },
                                    label: __( 'Text', 'kenzap-pricing' ),
                                },
                                {
                                    value: attributes.textColorBestSeller,
                                    onChange: ( value ) => {
                                        return setAttributes( { textColorBestSeller: value } );
                                    },
                                    label: __( 'Featured Text', 'kenzap-pricing' ),
                                },
                                {
                                    value: attributes.blueColor,
                                    onChange: ( blueColor ) => {
                                        return setAttributes( { blueColor } );
                                    },
                                    label: __( 'Blue color', 'kenzap-pricing' ),
                                },
                            ] }
                        />

                    <InspectorContainer
                        setAttributes={ setAttributes }
                        { ...attributes }
                        withPadding
                        withWidth100
                        withBackground
                        withAutoPadding
                    />
                </InspectorControls>
                <div className={ className ? className : '' } style={ vars }>
                    <ContainerEdit
                        className={ `kenzap-pricing-3 block-${ attributes.blockUniqId } ${ isSelected ? 'selected' : '' } kenzap-xs ` }
                        attributes={ attributes }
                        withBackground
                        withPadding
                    >
                        <div className="kenzap-container" style={ kenzapContanerStyles }>
                            <div className="kp-pricing-table">
                                { attributes.isFilterShow &&
                                    <div className="tabs-nav" style={ { background: attributes.blueColor } }>
                                        <ul>
                                            <li className={ `${ this.state.itemsType === 'items' ? 'active' : '' } ` }>
                                                <a
                                                    href="#"
                                                    style={ {
                                                        color: this.state.itemsType === 'items' ? attributes.blueColor : attributes.textColorBestSeller,
                                                        background: this.state.itemsType === 'items' ? attributes.textColorBestSeller : attributes.blueColor,
                                                    } }
                                                >
                                                    <input
                                                        value={ attributes.tableTypes.individual }
                                                        onChange={ ( e ) => {
                                                            const value = e.target.value;
                                                            const items = { ...attributes.tableTypes };
                                                            items.individual = value;
                                                            setAttributes( { tableTypes: items } );
                                                        } }
                                                        placeholder={ __( 'Table type', 'kenzap-pricing' ) }
                                                        style={ {
                                                            color: this.state.itemsType === 'items' ? attributes.blueColor : attributes.textColorBestSeller,
                                                            background: this.state.itemsType === 'items' ? attributes.textColorBestSeller : attributes.blueColor,
                                                            width: ( attributes.tableTypes.individual.length === 0 ? 10 : attributes.tableTypes.individual.length ) * 10,
                                                        } }
                                                    />
                                                </a>
                                            </li>
                                            <li className={ `${ this.state.itemsType === 'itemsBusiness' ? 'active' : '' } ` }>
                                                <a
                                                    href="#"
                                                    style={ {
                                                        color: this.state.itemsType === 'itemsBusiness' ? attributes.blueColor : attributes.textColorBestSeller,
                                                        background: this.state.itemsType === 'itemsBusiness' ? attributes.textColorBestSeller : attributes.blueColor,
                                                    } }
                                                >
                                                    <input
                                                        value={ attributes.tableTypes.business }
                                                        onChange={ ( e ) => {
                                                            const value = e.target.value;
                                                            const items = { ...attributes.tableTypes };
                                                            items.business = value;
                                                            setAttributes( { tableTypes: items } );
                                                        } }
                                                        placeholder={ __( 'Table type', 'kenzap-pricing' ) }
                                                        style={ {
                                                            color: this.state.itemsType === 'itemsBusiness' ? attributes.blueColor : attributes.textColorBestSeller,
                                                            background: this.state.itemsType === 'itemsBusiness' ? attributes.textColorBestSeller : attributes.blueColor,
                                                            width: ( attributes.tableTypes.business.length === 0 ? 10 : attributes.tableTypes.business.length ) * 10,
                                                        } }
                                                    />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                }
                                <div className="tabs-content">
                                    <div id="monthly" className="tab-content" style={ { display: this.state.itemsType === 'items' ? 'block' : 'none' } }>
                                        { getItems( 'items', attributes.bestSellerBlock ) }
                                    </div>
                                    <div id="yearly" className="tab-content" style={ { display: this.state.itemsType === 'itemsBusiness' ? 'block' : 'none' } }>
                                        { getItems( 'itemsBusiness', attributes.bestSellerBusinessBlock ) }
                                    </div>
                                </div>
                            </div>
                        </div>
                        { this.state.showError && <div className={ 'errorMessage errorShow' }>
                            { __( 'No more than 3 pricing tables are allowed per block.', 'kenzap-pricing' ) }
                        </div>
                        }
                        <div className="editPadding" />
                        <button
                            className="addWhite"
                            onClick={ this.addItem }>
                            <span><Plus /></span>{ __( 'Add new table', 'kenzap-pricing' ) }
                        </button>
                    </ContainerEdit>
                </div>
            </div>
        );
    }
}
