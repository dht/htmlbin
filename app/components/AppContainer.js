import { connect } from 'react-redux'
import App from './App'
import flexEditor from 'flex-editor';
import {showDataFieldModal, showInsertSnippetModal, editVariables} from '../reducers/app_thunks';

const mapStateToProps = (state, ownProps) => {

	const {flexState} = state,
		{appState} = flexState,
		{dataFieldModalOn, showPlaceholderPopover, showSnippetPopover,} = appState,
		{readonly, editorMode, codeMode, gridMode} = state.appState;

	return {
		readonly,
        dataFieldModalOn,
		showPlaceholderPopover,
        showSnippetPopover,
        editorMode,
        codeMode,
        gridMode,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		flashSelection: (delay) => {
            dispatch(flexEditor.showSelection(false));
            dispatch(flexEditor.refreshSelector(delay));

            setTimeout(() => {
                dispatch(flexEditor.showSelection(true));
			}, delay + 150);
		},
        showDataFieldModal: () => {
			dispatch(showDataFieldModal());
		},
        showInsertSnippetModal: () => {
			const {params} = ownProps,
				{width, height} = params;

			dispatch(showInsertSnippetModal(width, height));
		},
        showVariablesModal: () => {
            dispatch(editVariables());
        }
	}
}

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

export default AppContainer
