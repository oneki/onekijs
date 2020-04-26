import React, { useContext } from 'react';
import { useLocalService } from "../../lib/service";
import { isMobile } from "../../lib/utils/browser";
import { get, set } from "../../lib/utils/object";
import { isFalse } from "../../lib/utils/type";

export const dashboardService = {
  reducers: {
    expand: function(state, area) {
      set(state, `${area}.collapse`, false);
    },

    collapse: function(state, area) {
      if (area === 'all') {
        ['left', 'right', 'header', 'footer'].forEach(area => {
          if (isFalse(get(this.data, `${area}.collapse`))) {
            set(state, `${area}.collapse`, true);
          }
        })
      } else {
        set(state, `${area}.collapse`, true);
      }
      
    }, 

    toggle: function(state, area) {
      let collapse = get(this.data, `${area}.collapse`);
      let floating = get(this.data, `${area}.floating`);
      if (floating === 'auto') {
        floating = isMobile();
      }
      if (collapse === 'auto') {
        collapse = floating ? true : false;
      }
      set(state, `${area}.collapse`, !collapse);
    },    
  },
  sagas: {
    
  }
};

export const DashboardContext = React.createContext();

export const useDashboardService = (initialState={}) => {
  return useLocalService(dashboardService, initialState);
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  return [context.dashboard, context.service];
};
