import { Button } from '@wordpress/components';
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes } ) => {
	const { imageId, imageUrl, imageAlt, quote, author, role } = attributes;
	const blockProps = useBlockProps( { className: 'testimonial' } );

	const onSelectImage = ( media ) =>
		setAttributes( {
			imageId: media.id,
			imageUrl: media.url,
			imageAlt: media.alt,
		} );

	const onRemoveImage = () =>
		setAttributes( {
			imageId: undefined,
			imageUrl: '',
			imageAlt: '',
		} );

	return (
		<figure { ...blockProps }>
			<div className="testimonial__image">
				{ imageUrl ? (
					<MediaUploadCheck>
						<div>
							<img
								src={ imageUrl }
								alt={ imageAlt }
								className="testimonial__photo"
								style={ { display: 'block', width: '100%' } }
							/>
							<div style={ { display: 'flex', gap: '8px', marginTop: '8px' } }>
								<MediaUpload
									onSelect={ onSelectImage }
									allowedTypes={ [ 'image' ] }
									value={ imageId }
									render={ ( { open } ) => (
										<Button variant="secondary" onClick={ open }>
											{ __( 'Replace image', 'uncommon-editorial' ) }
										</Button>
									) }
								/>
								<Button variant="secondary" isDestructive onClick={ onRemoveImage }>
									{ __( 'Remove image', 'uncommon-editorial' ) }
								</Button>
							</div>
						</div>
					</MediaUploadCheck>
				) : (
					<MediaPlaceholder
						icon="format-image"
						labels={ {
							title: __( 'Author photo', 'uncommon-editorial' ),
							instructions: __( 'Upload or select a photo', 'uncommon-editorial' ),
						} }
						onSelect={ onSelectImage }
						allowedTypes={ [ 'image' ] }
					/>
				) }
			</div>

			<RichText
				tagName="blockquote"
				className="testimonial__quote"
				value={ quote }
				onChange={ ( value ) => setAttributes( { quote: value } ) }
				placeholder={ __( 'Enter quote…', 'uncommon-editorial' ) }
			/>

			<figcaption className="testimonial__attribution">
				<RichText
					tagName="p"
					className="testimonial__author"
					value={ author }
					onChange={ ( value ) => setAttributes( { author: value } ) }
					placeholder={ __( 'Author name…', 'uncommon-editorial' ) }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					disableLineBreaks
				/>
				<RichText
					tagName="cite"
					className="testimonial__role"
					value={ role }
					onChange={ ( value ) => setAttributes( { role: value } ) }
					placeholder={ __( 'Job title…', 'uncommon-editorial' ) }
					allowedFormats={ [] }
					disableLineBreaks
				/>
				</figcaption>
		</figure>
	);
};

export default Edit;
