const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const { RichText, InspectorControls, PanelColorSettings, MediaUpload } = wp.editor;
const { RangeControl, PanelBody, Popover, TextControl, ToggleControl } = wp.components;

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
    };

    timerId = 0;

    /**
     * Add a new item to list with default fields
     */
    addItem = () => {
        clearTimeout( this.timerId );
        if ( this.props.attributes.items.length >= 3 ) {
            this.setState( { showError: true } );
            this.timerId = setTimeout( () => {
                this.setState( { showError: false } );
                clearTimeout( this.timerId );
            }, 3000 );
        } else {
            key++;
            this.props.setAttributes( {
                items: [ ...this.props.attributes.items, {
                    ...defaultItem,
                    title: defaultItem.title + ' ' + ( key ),
                    key: 'new ' + new Date().getTime(),
                    iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-1/pricing-img-' + Math.round( 1 - 0.5 + ( Math.random() * ( 3 - 1 + 1 ) ) ) + '.png',
                } ],
            } );
        }
    };

    /**
     * Change any property of item
     * @param {string} property - editable field
     * @param {string} value - for field
     * @param {number} index - of items array
     * @param {boolean} withMutation - in some cases we should avoid mutation for force rerender component
     */
    onChangePropertyItem = ( property, value, index, withMutation = false ) => {
        const items = withMutation ? [ ...this.props.attributes.items ] : this.props.attributes.items;
        if ( ! items[ index ] ) {
            return;
        }
        items[ index ][ property ] = value;
        this.props.setAttributes( { items: items } );
    };

    /**
     * Remove item
     * It also add default item if we remove all elements from array
     * @param {number} index - of item
     */
    removeItem = ( index ) => {
        const items = [ ...this.props.attributes.items ];
        if ( items.length === 1 ) {
            this.props.setAttributes( {
                items: [ {
                    ...defaultItem,
                    iconMediaUrl: window.kenzap_pricing_gutenberg_path + 'pricing-1/pricing-img-' + Math.round( 1 - 0.5 + ( Math.random() * ( 3 - 1 + 1 ) ) ) + '.png',

                } ],
            } );
        } else {
            items.splice( index, 1 );
            this.props.setAttributes( { items: items } );
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

        return (
            <div>
                <InspectorControls>
                    <PanelBody
                        title={ __( 'General', 'kenzap-pricing' ) }
                        initialOpen={ false }
                    >
                        <RangeControl
                            label={ __( 'Icon Size', 'kenzap-pricing' ) }
                            value={ attributes.iconSize }
                            onChange={ ( iconSize ) => setAttributes( { iconSize } ) }
                            min={ 0 }
                            max={ 200 }
                        />
                        <RangeControl
                            label={ __( 'Title Size', 'kenzap-pricing' ) }
                            value={ attributes.titleSize }
                            onChange={ ( titleSize ) => setAttributes( { titleSize } ) }
                            min={ 10 }
                            max={ 130 }
                        />
                        <RangeControl
                            label={ __( 'Subtitle Size', 'kenzap-pricing' ) }
                            value={ attributes.descriptionSize }
                            onChange={ ( descriptionSize ) => setAttributes( { descriptionSize } ) }
                            min={ 10 }
                            max={ 130 }
                        />
                        <RangeControl
                            label={ __( 'Description Size', 'kenzap-pricing' ) }
                            value={ attributes.listDescriptionSize }
                            onChange={ ( listDescriptionSize ) => setAttributes( { listDescriptionSize } ) }
                            min={ 10 }
                            max={ 130 }
                        />
                        <RangeControl
                            label={ __( 'Featured Table', 'kenzap-pricing' ) }
                            value={ attributes.bestSellerBlock }
                            onChange={ ( bestSellerBlock ) => setAttributes( { bestSellerBlock } ) }
                            min={ 1 }
                            max={ attributes.items.length }
                        />
                        <RangeControl
                            label={ __( 'Table Border Radius', 'kenzap-pricing' ) }
                            value={ attributes.cardBorderRadius }
                            onChange={ ( cardBorderRadius ) => setAttributes( { cardBorderRadius } ) }
                            min={ 0 }
                            max={ 100 }
                        />
                        <RangeControl
                            label={ __( 'Button Border Radius', 'kenzap-pricing' ) }
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
                                    return setAttributes( { textColor: ((typeof(value)=='undefined')?'#fff':value) } );
                                },
                                label: __( 'Text', 'kenzap-pricing' ),
                            },
                            {
                                value: attributes.buttonColor,
                                onChange: ( buttonColor ) => {
                                    return setAttributes( { buttonColor: ((typeof(buttonColor)=='undefined')?'#0abc5f':buttonColor) } );
                                },
                                label: __( 'Button Background', 'kenzap-pricing' ),
                            },
                            {
                                value: attributes.buttonTextColor,
                                onChange: ( buttonTextColor ) => {
                                    return setAttributes( { buttonTextColor: ((typeof(buttonColor)=='undefined')?'#fff':buttonColor) } );
                                },
                                label: __( 'Button Text', 'kenzap-pricing' ),
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
                <div className={ `${ className ? className : '' } ` } style={ vars }>
                    <ContainerEdit
                        className={ `kenzap-pricing-1 block-${ attributes.blockUniqId } ${ 'kenzap-sm' } ${ isSelected ? 'selected' : '' } ` }
                        attributes={ attributes }
                        withBackground
                        withPadding
                    >
                        <div className="kenzap-container" style={ kenzapContanerStyles }>
                            <div className="kp-pricing-table">
                                { attributes.items && attributes.items.map( ( item, index ) => (
                                    <div
                                        key={ item.key }
                                        className="kenzap-col-4"
                                    >
                                        <button className="remove" onClick={ () => this.removeItem( index ) }>
                                            <span className="dashicons dashicons-no" />
                                        </button>
                                        <div
                                            className={ `pricing-box ${ attributes.bestSellerBlock === index + 1 ? 'best-seller' : '' }` }
                                            style={ {
                                                borderRadius: attributes.cardBorderRadius,
                                            } }
                                        >
                                            <MediaUpload
                                                onSelect={ ( media ) => {
                                                    this.onChangePropertyItem( 'iconMediaId', media.id, index );
                                                    this.onChangePropertyItem( 'iconMediaUrl', media.url, index, true );
                                                } }
                                                value={ item.iconMediaId }
                                                allowedTypes={ [ 'image', 'image/svg+xml' ] }
                                                render={ ( props ) => (
                                                    <img
                                                        src={ item.iconMediaUrl }
                                                        alt={ item.title.replace( /<(?:.|\n)*?>/gm, '' ) }
                                                        onClick={ props.open }
                                                        role="presentation"
                                                        style={ { height: attributes.iconSize } }
                                                    />
                                                ) }
                                            />
                                            <RichText
                                                tagName="h3"
                                                placeholder={ __( 'Title', 'kenzap-pricing' ) }
                                                value={ item.title }
                                                onChange={ ( value ) => this.onChangePropertyItem( 'title', value, index, true ) }
                                                style={ {
                                                    color: attributes.textColor,
                                                    fontSize: `${ attributes.titleSize }px`,
                                                    lineHeight: `${ attributes.titleSize * 1.4 }px`,
                                                } }
                                            />
                                            <RichText
                                                tagName="p"
                                                placeholder={ __( 'Description', 'kenzap-pricing' ) }
                                                value={ item.description }
                                                onChange={ ( value ) => this.onChangePropertyItem( 'description', value, index, true ) }
                                                style={ {
                                                    color: attributes.textColor,
                                                    fontSize: `${ attributes.descriptionSize }px`,
                                                    lineHeight: `${ attributes.descriptionSize * 1.74 }px`,
                                                } }
                                            />
                                            <strong
                                                className="kp-price"
                                                style={ {
                                                    color: attributes.textColor,
                                                    lineHeight: 1.25,
                                                } }
                                            >
                                                <sup>
                                                    <input
                                                        value={ item.currency }
                                                        onChange={ ( event ) => {
                                                            const value = event.target.value;
                                                            this.onChangePropertyItem( 'currency', value, index, true );
                                                        } }
                                                        placeholder={ __( '$', 'kenzap-pricing' ) }
                                                        style={ {
                                                            width: `${ ( item.currency.length === 0 ? 1 : item.currency.length ) * 20 }px`,
                                                            color: attributes.textColor,
                                                        } }
                                                    />
                                                </sup>
                                                <input
                                                    value={ item.price }
                                                    onChange={ ( event ) => {
                                                        const value = event.target.value;
                                                        this.onChangePropertyItem( 'price', value, index, true );
                                                    } }
                                                    placeholder={ __( '100', 'kenzap-pricing' ) }
                                                    style={ {
                                                        width: `${ ( item.price.length === 0 ? 3 : item.price.length ) * 31 }px`,
                                                        color: attributes.textColor,
                                                    } }
                                                />
                                                <sub>/
                                                    <input
                                                        value={ item.period }
                                                        onChange={ ( event ) => {
                                                            const value = event.target.value;
                                                            this.onChangePropertyItem( 'period', value, index, true );
                                                        } }
                                                        placeholder={ __( 'mo', 'kenzap-pricing' ) }

                                                        style={ {
                                                            width: `${ ( item.period.length === 0 ? 2 : item.period.length ) * 25 }px`,
                                                            color: attributes.textColor,
                                                        } }
                                                    />
                                                </sub>
                                            </strong>
                                            <RichText
                                                tagName="ul"
                                                placeholder={ __( 'Description' ) }
                                                value={ item.subDescription }
                                                onChange={ ( value ) => this.onChangePropertyItem( 'subDescription', value, index, true ) }
                                                multiline="li"
                                                style={ {
                                                    color: attributes.textColor,
                                                    fontSize: `${ attributes.listDescriptionSize }px`,
                                                    lineHeight: `${ attributes.listDescriptionSize * 1.74 }px`,
                                                } }
                                            />
                                            <a
                                                className="kp-link"
                                                onClick={ () => this.setState( { isButtonPopupVisibleIndex: index } ) }
                                                style={ {
                                                    background: attributes.buttonColor,
                                                    borderRadius: attributes.buttonBorderRadius,
                                                } }
                                            >
                                                <input
                                                    value={ item.buttonText }
                                                    onChange={ ( event ) => {
                                                        const value = event.target.value;
                                                        this.onChangePropertyItem( 'buttonText', value, index, true );
                                                    } }
                                                    style={ {
                                                        width: `${ 15 * item.buttonText.length * 0.7 }px`,
                                                        color: attributes.buttonTextColor,
                                                    } }
                                                />
                                            </a>

                                            { this.state.isButtonPopupVisibleIndex === index &&
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
                                                        this.onChangePropertyItem( 'buttonUrl', value, index, true );
                                                    } }
                                                />
                                                <ToggleControl
                                                    label={ __( 'Settings' ) }
                                                    help={ item.buttonUrlTarget ? __( 'Open link in new window.', 'kenzap-pricing' ) : __( 'Open link in current window', 'kenzap-pricing' ) }
                                                    checked={ item.buttonUrlTarget }
                                                    onChange={ ( value ) => {
                                                        this.onChangePropertyItem( 'buttonUrlTarget', value, index, true );
                                                    } }
                                                />
                                            </Popover>
                                            }
                                        </div>
                                    </div>
                                ) ) }
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
