import { TextControl, PanelBody } from '@wordpress/components';
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes } ) => {
	const { heading, subheading, shortcode } = attributes;
	const blockProps = useBlockProps( { className: 'contact-form' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Contact Form Settings', 'uncommon-editorial' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Heading', 'uncommon-editorial' ) }
						value={ heading }
						onChange={ ( value ) => setAttributes( { heading: value } ) }
						placeholder={ __( 'Enter heading…', 'uncommon-editorial' ) }
					/>
					<TextControl
						label={ __( 'Shortcode', 'uncommon-editorial' ) }
						value={ shortcode }
						onChange={ ( value ) => setAttributes( { shortcode: value } ) }
						placeholder={ __( '[contact-form-7 id="123"]', 'uncommon-editorial' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					tagName="h2"
					className="contact-form__heading"
					value={ heading }
					onChange={ ( value ) => setAttributes( { heading: value } ) }
					placeholder={ __( 'Enter heading…', 'uncommon-editorial' ) }
				/>
				<RichText
					tagName="div"
					className="contact-form__subheading"
					value={ subheading }
					onChange={ ( value ) => setAttributes( { subheading: value } ) }
					placeholder={ __( 'Enter subheading…', 'uncommon-editorial' ) }
				/>
				<div className="contact-form__shortcode-preview">
					{ shortcode
						? <code>{ shortcode }</code>
						: <p style={ { opacity: 0.4, fontStyle: 'italic' } }>{ __( 'Add a shortcode in the block settings panel →', 'uncommon-editorial' ) }</p>
					}
				</div>
			</div>
		</>
	);
};

export default Edit;
