const { __ } = wp.i18n; // Import __() from wp.i18n
const { RangeControl, CheckboxControl, SelectControl, RadioControl, PanelBody, Button } = wp.components;
const { Component, Fragment } = wp.element;
const { MediaUpload, PanelColorSettings } = wp.editor;

export const blockProps = {
    containerMaxWidth: {
        type: 'string',
        default: '1170',
    },

    containerPadding: {
        type: 'number',
        default: 0,
    },

    withPadding: {
        type: 'boolean',
        default: false,
    },

    autoPadding: {
        type: 'string',
        default: '',
    },

    withAutoPadding: {
        type: 'boolean',
        default: false,
    },

    width100: {
        type: 'boolean',
        default: false,
    },

    backgroundColor: {
        type: 'string',
        default: '#FFF',
    },

    backgroundImage: {
        type: 'string',
        default: 'none',
    },

    backgroundImageId: {
        type: 'string',
        default: '',
    },

    backgroundStyle: {
        type: 'string',
        default: '',
    },

    backgroundPosition: {
        type: 'string',
        default: 'center center',
    },

    alignment: {
        type: 'string',
        default: '',
    },
};

/**
 * Implements inspector container
 */
export class InspectorContainer extends Component {
    render() {
        const {
            withBackground = true,
            backgroundImageId,
            backgroundImage,
            containerMaxWidth,
            backgroundColor,
            backgroundRepeat,
            backgroundPosition,
            alignment,
            setAttributes,
            width100,
            withWidth100 = false,
            withPadding = false,
            containerPadding,
            autoPadding = '',
        } = this.props;

        return (
            <Fragment>
                { withBackground &&
                <PanelBody
                    title={ __( 'Background', 'kenzap-pricing' ) }
                    initialOpen={ false }
                >
                    <PanelColorSettings
                        title={ __( 'Color', 'kenzap-pricing' ) }
                        initialOpen={ true }
                        colorSettings={ [
                                {
                                    value: backgroundColor,
                                    onChange: ( value ) => {
                                        return setAttributes( { backgroundColor: ((typeof(value)=='undefined')?'#f1f1f1': value) } );
                                    },
                                    label: __( 'Selected', 'kenzap-pricing' ),
                                },
                            ] }
                    />

                    <p style={ { marginBottom: '5px' } }>{ __( 'Image', 'kenzap-pricing' ) }</p>
                    <MediaUpload
                        onSelect={ ( media ) => {
                                this.props.setAttributes( {
                                    backgroundImage: media.url,
                                    backgroundImageId: media.id,
                                } );
                            } }
                        value={ backgroundImageId }
                        allowedTypes={ [ 'image' ] }
                        render={ ( mediaUploadProps ) => (
                            <Fragment>
                                { ( backgroundImageId || backgroundImage !== 'none' ) ? (
                                    <Fragment>
                                        <Button
                                            isDefault
                                            onClick={ () => {
                                                setAttributes( {
                                                    backgroundImageId: '',
                                                    backgroundImage: 'none',
                                                } );
                                            } }
                                        >
                                            { __( 'Remove', 'kenzap-pricing' ) }
                                        </Button>
                                        <div
                                            style={ {
                                                width: '27px',
                                                height: '27px',
                                                display: 'inline-block',
                                                margin: '0 0 0 5px',
                                                backgroundImage: `url(${ [ this.props.backgroundImage ? this.props.backgroundImage : '' ] })`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                            } }
                                        />
                                    </Fragment>
                                ) : (
                                    <Button isDefault onClick={ mediaUploadProps.open }>
                                        { __( 'Upload/Choose', 'kenzap-pricing' ) }
                                    </Button>
                                ) }
                            </Fragment>

                            ) }
                        />

                    <p style={ { fontStyle: 'italic' } }>
                        { __( 'Override background color with image. Transparent images may also apply.', 'kenzap-pricing' ) }
                    </p>

                    <SelectControl
                        label={ __( 'Image Alignment', 'kenzap-pricing' ) }
                        value={ backgroundRepeat }
                        options={ [
                                { label: __( 'default', 'kenzap-pricing' ), value: 'default' },
                                { label: __( 'contain', 'kenzap-pricing' ), value: 'contain' },
                                { label: __( 'cover', 'kenzap-pricing' ), value: 'cover' },
                                { label: __( 'repeat', 'kenzap-pricing' ), value: 'repeat' },
                            ] }
                        onChange={ ( value ) => {
                                setAttributes( { backgroundStyle: value } );
                            } }
                        help={ __( 'Choose how to align background image', 'kenzap-pricing' ) }
                        />

                    <SelectControl
                        label={ __( 'Background Position', 'kenzap-pricing' ) }
                        value={ backgroundPosition }
                        options={ [
                                { label: __( 'left top', 'kenzap-pricing' ), value: 'left top' },
                                { label: __( 'left center', 'kenzap-pricing' ), value: 'left center' },
                                { label: __( 'left bottom', 'kenzap-pricing' ), value: 'left bottom' },
                                { label: __( 'right top', 'kenzap-pricing' ), value: 'right top' },
                                { label: __( 'right center', 'kenzap-pricing' ), value: 'right center' },
                                { label: __( 'right bottom', 'kenzap-pricing' ), value: 'right bottom' },
                                { label: __( 'center top', 'kenzap-pricing' ), value: 'center top' },
                                { label: __( 'center center', 'kenzap-pricing' ), value: 'center center' },
                                { label: __( 'center bottom', 'kenzap-pricing' ), value: 'center bottom' },
                            ] }
                        onChange={ ( value ) => {
                                setAttributes( { backgroundPosition: value } );
                            } }
                        help={ __( 'Sets the starting position of a background image', 'kenzap-pricing' ) }
                        />
                </PanelBody>
                }

                <PanelBody
                    title={ __( 'Container', 'kenzap-pricing' ) }
                    initialOpen={ false }
                >
                    <RadioControl
                        label={ __( 'Alignment', 'kenzap-pricing' ) }
                        selected={ alignment }
                        options={ [
                            { label: 'Default', value: '' },
                            { label: 'Full width', value: 'fullwidth' },
                        ] }
                        onChange={ ( value ) => {
                            setAttributes( { alignment: value } );
                        } }
                        help={ __( 'Full Width may not work properly with all layout types including layouts with sidebars', 'kenzap-pricing' ) }
                    />

                    { ! width100 &&
                    <RangeControl
                        label={ __( 'Max Width', 'kenzap-pricing' ) }
                        value={ Number( containerMaxWidth ) }
                        onChange={ ( value ) => setAttributes( { containerMaxWidth: `${ value }` } ) }
                        min={ 300 }
                        max={ 2000 }
                        help={ __( 'Restrict layout width for content children.', 'kenzap-pricing' ) }
                    />
                    }

                    { withWidth100 &&
                    <CheckboxControl
                        label={ __( 'No Restriction', 'kenzap-pricing' ) }
                        checked={ width100 }
                        onChange={ ( isChecked ) => {
                            setAttributes( {
                                width100: isChecked,
                                containerMaxWidth: isChecked ? '100%' : '1170',
                            } );
                        } }
                        help={ __( 'No restriction layout width for content children.', 'kenzap-pricing' ) }
                    />
                    }

                    { withPadding &&
                        <Fragment>
                            <RangeControl
                                label={ __( 'Top & Bottom Paddings', 'kenzap-pricing' ) }
                                value={ containerPadding }
                                onChange={ ( value ) => setAttributes( { containerPadding: value } ) }
                                min={ 0 }
                                max={ 200 }
                                help={ __( 'Useful when you want to extend background image vertical size or create more space.', 'kenzap-pricing' ) }
                            />

                            <CheckboxControl
                                label={ __( 'Responsive Paddings', 'kenzap-pricing' ) }
                                checked={ autoPadding.length > 0 }
                                onChange={ ( isChecked ) => {
                                    setAttributes( {
                                        autoPadding: isChecked ? 'autoPadding' : '',
                                    } );
                                } }
                                help={ __( 'Provides auto calculations for top and bottom paddings', 'kenzap-pricing' ) }
                            />
                        </Fragment>
                    }
                </PanelBody>
            </Fragment>
        );
    }
}

/**
 * Implements the edit container
 * @param {Object} props from editor
 * @return {Node} rendered edit component
 * @constructor
 */
export const ContainerEdit = ( props ) => {
    const styles = {};

    if ( props.withBackground ) {
        if ( props.attributes.backgroundImage ) {
            styles.backgroundImage = props.attributes.backgroundImage !== 'none' ? `url(${ props.attributes.backgroundImage })` : 'none';
            styles.backgroundRepeat = props.attributes.backgroundRepeat;
            styles.backgroundSize = props.attributes.backgroundSize;
            styles.backgroundPosition = props.attributes.backgroundPosition;
        }

        if ( props.attributes.backgroundColor ) {
            styles.backgroundColor = props.attributes.backgroundColor;
        }
    }

    if ( props.withPadding && ! props.attributes.autoPadding ) {
        styles.padding = `${ props.attributes.containerPadding }px 0`;
    }

    switch ( props.attributes.backgroundStyle ) {
        case 'default': {
            styles.backgroundRepeat = 'no-repeat';
            styles.backgroundSize = 'auto';
            break;
        }

        case 'contain': {
            styles.backgroundRepeat = 'no-repeat';
            styles.backgroundSize = 'contain';
            break;
        }

        case 'cover': {
            styles.backgroundRepeat = 'no-repeat';
            styles.backgroundSize = 'cover';
            break;
        }

        case 'repeat': {
            styles.backgroundRepeat = 'repeat';
            styles.backgroundSize = 'auto';
        }
    }

    return (
        <div
            className={ `${ props.className } admin ${ props.attributes.alignment } ${ props.attributes.autoPadding }` }
            style={ { ...styles, ...props.style } }
        >
            { props.children }
        </div>
    );
};

/**
 * Implements the save container
 * @param {Object} props from editor
 * @return {Node} rendered edit component
 * @constructor
 */
export const ContainerSave = ( props ) => {
    const styles = {};

    if ( props.withBackground ) {
        if ( props.attributes.backgroundImage ) {
            styles.backgroundImage = props.attributes.backgroundImage !== 'none' ? `url(${ props.attributes.backgroundImage })` : 'none';
            styles.backgroundRepeat = props.attributes.backgroundRepeat;
            styles.backgroundSize = props.attributes.backgroundSize;
            styles.backgroundPosition = props.attributes.backgroundPosition;
        }

        if ( props.attributes.backgroundColor ) {
            styles.backgroundColor = props.attributes.backgroundColor;
        }
    }

    if ( props.withPadding && ! props.attributes.autoPadding ) {
        styles.padding = `${ props.attributes.containerPadding }px 0`;
    }

    switch ( props.attributes.backgroundStyle ) {
        case 'default': {
            styles.backgroundRepeat = 'no-repeat';
            styles.backgroundSize = 'auto';
            break;
        }

        case 'contain': {
            styles.backgroundRepeat = 'no-repeat';
            styles.backgroundSize = 'contain';
            break;
        }

        case 'cover': {
            styles.backgroundRepeat = 'no-repeat';
            styles.backgroundSize = 'cover';
            break;
        }

        case 'repeat': {
            styles.backgroundRepeat = 'repeat';
            styles.backgroundSize = 'auto';
        }
    }

    let additionalClassForKenzapContainer = 'kenzap-lg';
    if ( props.attributes.containerMaxWidth < 992 ) {
        additionalClassForKenzapContainer = 'kenzap-md';
    }
    if ( props.attributes.containerMaxWidth < 768 ) {
        additionalClassForKenzapContainer = 'kenzap-sm';
    }
    if ( props.attributes.containerMaxWidth < 480 ) {
        additionalClassForKenzapContainer = 'kenzap-xs';
    }

    if ( props.attributes.width100 ) {
        additionalClassForKenzapContainer = 'kenzap-lg';
    }

    return (
        <div
            className={ `${ props.className } ${ additionalClassForKenzapContainer } ${ props.attributes.alignment } ${ props.attributes.autoPadding }` }
            style={ { ...styles, ...props.style } }
        >
            { props.children }
        </div>
    );
};
