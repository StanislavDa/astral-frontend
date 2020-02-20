import { xorBy } from 'lodash-es';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { ListItem, FlexContainer } from '@astral-frontend/components';
import { makeStyles } from '@astral-frontend/styles';

import {
  DataListContext,
  DataListItemContext,
} from '@astral-frontend/data-list';
import TableTemplatedDataListItemDefaultSelector from './TableTemplatedDataListItemDefaultSelector';

const useStyles = makeStyles(
  theme => ({
    root: {
      display: 'grid',
      minHeight: '70px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      padding: theme.spacing(4, 0),
      borderWidth: theme.spacing(0, 0, 0, 1),
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.gray[800],
      backgroundColor: theme.palette.common.white,
      '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[1],
      },
    },
  }),
  { name: 'TableTemplatedDataListItem' },
);

const TableTemplatedDataListItem = ({
  className,
  Icon,
  Selector,
  children,
  component,
  ...props
}) => {
  const classes = useStyles();
  const { selectedItems, setSelectedItems, disableSelect } = React.useContext(
    DataListContext,
  );
  const { data } = React.useContext(DataListItemContext);
  const [hovered, setHovered] = React.useState(false);
  const checked = Boolean(
    selectedItems.find(selectedItem => selectedItem.id === data.id),
  );
  const selectorVisible = (!disableSelect && hovered) || checked;
  const handleSelectorChange = () => {
    setSelectedItems(prevSelectedItems => {
      return xorBy(prevSelectedItems, [data], 'id');
    });
  };
  const handleListItemMouseEnter = () => {
    setHovered(true);
  };

  const handleListItemMouseLeave = () => {
    setHovered(false);
  };

  return (
    <ListItem
      className={cn(classes.root, className)}
      component={component}
      onMouseEnter={handleListItemMouseEnter}
      onMouseLeave={handleListItemMouseLeave}
      {...props}
    >
      <FlexContainer justifyContent="center">
        {selectorVisible ? (
          <Selector
            className={classes.selector}
            checked={checked}
            onChange={handleSelectorChange}
          />
        ) : (
          <Icon />
        )}
      </FlexContainer>
      {children}
    </ListItem>
  );
};

TableTemplatedDataListItem.defaultProps = {
  component: 'div',
  className: null,
  disableGutters: true,
  button: false,
  Icon: () => <div />,
  Selector: TableTemplatedDataListItemDefaultSelector,
};

TableTemplatedDataListItem.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  className: PropTypes.string,
  disableGutters: PropTypes.bool,
  button: PropTypes.bool,
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  ).isRequired,
  Icon: PropTypes.func,
  Selector: PropTypes.func,
};

export default TableTemplatedDataListItem;