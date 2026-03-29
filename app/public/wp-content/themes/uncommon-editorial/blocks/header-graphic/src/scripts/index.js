import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from '../../block.json';

const Edit = () => {
	const blockProps = useBlockProps();
	return <div { ...blockProps }>[ Header Graphic ]</div>;
};

registerBlockType( metadata, {
	edit: Edit,
	save: () => null,
} );
