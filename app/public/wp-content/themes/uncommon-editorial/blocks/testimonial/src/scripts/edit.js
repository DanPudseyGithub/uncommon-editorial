import { TextControl, Button, PanelBody } from '@wordpress/components';
import { InspectorControls, useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes } ) => {
	const { imageId, imageUrl, imageAlt, quote, author, role, organisation } = attributes;
	const blockProps = useBlockProps( { className: 'testimonial' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Testimonial', 'uncommon-editorial' ) } initialOpen={ true }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									imageId: media.id,
									imageUrl: media.url,
									imageAlt: media.alt,
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) => (
								<div style={ { marginBottom: '16px' } }>
									{ imageUrl ? (
										<>
											<img src={ imageUrl } alt={ imageAlt } style={ { width: '100%', marginBottom: '8px' } } />
											<Button variant="secondary" onClick={ open }>
												{ __( 'Replace Image', 'uncommon-editorial' ) }
											</Button>
										</>
									) : (
										<Button variant="secondary" onClick={ open }>
											{ __( 'Select Image', 'uncommon-editorial' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
					<TextControl
						label={ __( 'Author', 'uncommon-editorial' ) }
						value={ author }
						onChange={ ( value ) => setAttributes( { author: value } ) }
						placeholder={ __( 'Author name…', 'uncommon-editorial' ) }
					/>
					<TextControl
						label={ __( 'Role', 'uncommon-editorial' ) }
						value={ role }
						onChange={ ( value ) => setAttributes( { role: value } ) }
						placeholder={ __( 'Job title…', 'uncommon-editorial' ) }
					/>
					<TextControl
						label={ __( 'Organisation', 'uncommon-editorial' ) }
						value={ organisation }
						onChange={ ( value ) => setAttributes( { organisation: value } ) }
						placeholder={ __( 'Company or organisation…', 'uncommon-editorial' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ imageUrl && (
					<div className="testimonial__image">
						<img src={ imageUrl } alt={ imageAlt } className="testimonial__photo" />
					</div>
				) }
				<RichText
					tagName="blockquote"
					className="testimonial__quote"
					value={ quote }
					onChange={ ( value ) => setAttributes( { quote: value } ) }
					placeholder={ __( 'Enter quote…', 'uncommon-editorial' ) }
				/>
				<footer className="testimonial__attribution">
					{ author && <p className="testimonial__author">{ author }</p> }
					{ role && <p className="testimonial__role">{ role }</p> }
					{ organisation && <p className="testimonial__organisation">{ organisation }</p> }
				</footer>
			</div>
		</>
	);
};

export default Edit;
