import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Checkbox from '@quantumblack/kedro-ui/lib/components/checkbox';
import { toggleNodeHovered, toggleNodesDisabled } from '../../actions';

const NodeListItem = ({
  onToggleNodesDisabled,
  onToggleNodeHovered,
  node,
  theme,
  disabled
}) => (
  <li
    className={classnames('pipeline-node pipeline-node--nest1', {
      'pipeline-node--active': node.active,
      'pipeline-node--disabled': disabled
    })}
    title={node.name}
    onMouseEnter={() => onToggleNodeHovered(node.id)}
    onMouseLeave={() => onToggleNodeHovered(null)}>
    <Checkbox
      checked={!node.disabled_node}
      label={
        <span
          dangerouslySetInnerHTML={{
            __html: node.highlightedLabel
          }}
        />
      }
      name={node.name}
      onChange={(e, { checked }) => onToggleNodesDisabled([node.id], !checked)}
      theme={theme}
    />
  </li>
);

export const mapStateToProps = state => ({
  theme: state.theme
});

export const mapDispatchToProps = dispatch => ({
  onToggleNodeHovered: nodeID => {
    dispatch(toggleNodeHovered(nodeID));
  },
  onToggleNodesDisabled: (nodeIDs, disabled) => {
    dispatch(toggleNodesDisabled(nodeIDs, disabled));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeListItem);
