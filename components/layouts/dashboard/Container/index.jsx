import cn from 'classnames';
import { PropTypes } from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const DashboardContainer = ({ classes, className, children }) => (
  <div className={cn(classes.root, className)}>{children}</div>
);

DashboardContainer.defaultProps = {
  className: null,
};

DashboardContainer.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default withStyles({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
})(DashboardContainer);