import React from 'react';
import './App.scss';
import FlexEditor from 'flex-editor/FlexEditor';
import AdhockBar from './AdhocBar/AdhocBarContainer';

import Titlebar from './Titlebar';
import CodeEditor from './CodeEditor';
import RootModal from './Modals/RootModalContainer';

import Drawer from 'material-ui-extensions/Drawer';
import {EDITOR_MODES, CODE_MODES, GRID_MODES} from '../reducers/appState/appState';

import {listenToState_adhock, stopToListen} from '../utils/elements_api'

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false
        }

        this.openCodeDrawer = this.openCodeDrawer.bind(this);
    }

    componentWillReceiveProps(props) {
        const {dataFieldModalOn, showPlaceholderPopover, showSnippetPopover} = props;

        if (this.state.dataFieldModalOn !== dataFieldModalOn) {
            this.setState({dataFieldModalOn})

            if (dataFieldModalOn) {
                this.props.showDataFieldModal();
            }
        }

        if (this.state.showPlaceholderPopover !== showPlaceholderPopover) {
            this.setState({showPlaceholderPopover})

            if (showPlaceholderPopover) {
                this.props.showInsertSnippetModal();
            }
        }

        if (this.state.showSnippetPopover !== showSnippetPopover) {
            this.setState({showSnippetPopover})

            if (showSnippetPopover) {
                this.props.showVariablesModal();
            }
        }
    }

    openCodeDrawer() {
        let {drawerOpen} = this.state;

        drawerOpen = !drawerOpen;

        this.props.flashSelection(500);
        this.setState({drawerOpen});
    }

    render() {
        const {readonly, params, editorMode} = this.props;
        let {width, height} = params;
        const {drawerOpen} = this.state;
        let zoom = 1.2;

        switch (editorMode) {
            case EDITOR_MODES.mobile:
                width = width || 320;
                height = height || 528;
                zoom = 1.2;
                break;

            case EDITOR_MODES.dashboard:
                width = width || 1280;
                height = height || 700;
                zoom = 1.0;
                break;
        }

        return <div className="App-container">
            <Drawer
                drawerOpen={drawerOpen}
                flex={true}
                left={true}
                drawerStyle={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}
                width={400}
                hideToggle={true}>
                <Titlebar drawerOpen={drawerOpen} toggle={this.openCodeDrawer}>
                    <div>Code <span className="readonly">(readonly)</span></div>
                </Titlebar>
                <CodeEditor />
            </Drawer>

            <div className="editor-container">
                <FlexEditor
                    colors={[]}
                    fonts={[]}
                    width={width}
                    height={height}
                    zoom={zoom}
                    readonly={readonly}
                    hideTreeTabs={true}
                    showDataButtons={true}
                    subscribe={listenToState_adhock}
                    unsubscribe={stopToListen}
                />

                <div style={styles.adhocBar}>
                    <AdhockBar />
                </div>

                <div style={styles.adhocBar}>
                    <AdhockBar />
                </div>

                <RootModal />
            </div>
        </div>
    }
}

const styles = {
    adhocBar: {
        width: '100px',
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginLeft: '20px',
        zIndex: 999,
        backgroundColor: 'white',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        borderRadius: '1px',
    }
}