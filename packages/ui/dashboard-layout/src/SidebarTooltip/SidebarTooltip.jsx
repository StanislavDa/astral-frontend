import PropTypes from 'prop-types';
import React from 'react';
import { Tooltip } from '@astral-frontend/components';
import { makeStyles } from '@astral-frontend/styles';

const useStyles = makeStyles(
  theme => ({
    tooltip: {
      position: 'relative',
      backgroundColor: theme.palette.gray[900],
      zIndex: 9999,
    },
    arrow: {
      position: 'absolute',
      fontSize: 6,
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
    popper: {
      '&[x-placement*="right"] $arrow': {
        left: 0,
        marginLeft: '-0.95em',
        height: '2em',
        width: '1em',
        '&::before': {
          borderWidth: '1em 1em 1em 0',
          borderColor: `transparent ${theme.palette.gray[900]} transparent transparent`,
        },
      },
    },
  }),
  {
    name: 'SidebarTooltip',
  },
);

const DashboardLayoutSidebarTooltip = ({ children, text }) => {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = React.useState(null);
  const TooltipArrow = (
    <>
      {text}
      <span className={classes.arrow} ref={setArrowRef} />
    </>
  );

  return (
    <Tooltip
      placement="right"
      classes={{
        tooltip: classes.tooltip,
        popper: classes.popper,
      }}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      title={TooltipArrow}
    >
      {children}
    </Tooltip>
  );
};

DashboardLayoutSidebarTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default DashboardLayoutSidebarTooltip;