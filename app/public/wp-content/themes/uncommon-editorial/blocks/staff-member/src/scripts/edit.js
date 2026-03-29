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
	const { imageId, imageUrl, imageAlt, name, role, description } = attributes;
	const blockProps = useBlockProps( { className: 'staff-member' } );

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
		<div { ...blockProps }>
			<div className="staff-member__image">
				{ imageUrl ? (
					<MediaUploadCheck>
						<div style={ { position: 'relative' } }>
							<img
								src={ imageUrl }
								alt={ imageAlt }
								className="staff-member__photo"
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
							title: __( 'Staff photo', 'uncommon-editorial' ),
							instructions: __( 'Upload or select a photo', 'uncommon-editorial' ),
						} }
						onSelect={ onSelectImage }
						allowedTypes={ [ 'image' ] }
						disableMediaButtons={ false }
					/>
				) }
			</div>

			<div className="staff-member__info">
				<RichText
					tagName="h3"
					className="staff-member__name"
					value={ name }
					onChange={ ( value ) => setAttributes( { name: value } ) }
					placeholder={ __( 'Full name...', 'uncommon-editorial' ) }
					allowedFormats={ [] }
					disableLineBreaks
				/>
				<RichText
					tagName="p"
					className="staff-member__role"
					value={ role }
					onChange={ ( value ) => setAttributes( { role: value } ) }
					placeholder={ __( 'Job title...', 'uncommon-editorial' ) }
					allowedFormats={ [] }
					disableLineBreaks
				/>
				<RichText
					tagName="div"
					className="staff-member__description"
					value={ description }
					onChange={ ( value ) => setAttributes( { description: value } ) }
					placeholder={ __( 'Enter staff description...', 'uncommon-editorial' ) }
				/>
			</div>
		</div>
	);
};

export default Edit;
