import React from "react";
import styled from "styled-components";
import { isMobile } from "../../lib/utils/browser";
import { get, isNull } from "../../lib/utils/object";
import { isFalse, isTrue } from "../../lib/utils/type";
import { DashboardContext, useDashboardService } from "./service";


const fillRow = (grid, rowIndex, type) => {
  grid[rowIndex].forEach((el, colIndex) => {
    if (el === "none") {
      grid[rowIndex][colIndex] = type;
    }
  });
};

const fillColumn = (grid, colIndex, type) => {
  grid.forEach((row, rowIndex) => {
    if (row[colIndex] === "none") {
      grid[rowIndex][colIndex] = type;
    }
  });
};

const getColWidth = (column, size) => {
  let width = column.width;
  if (!isTrue(column.floating)) {
    if (column.collapse === 'auto') {
      width = size === 'small' ? column.collapseWidth : column.width;
    } else if (isTrue(column.collapse)) {
      width = column.collapseWidth;
    }
  }
  return width;
}

const getTemplate = (size, areas, header, footer, left, right, body) => {
  const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);
  areas = clone(areas);
  const rows = [0, "auto", 0];
  const cols = [0, "auto", 0];

  if (right.floating || !right.present) {
    // drop last column
    [0,1,2].forEach(i => areas[i].splice(2,1));
    cols.splice(2,1);
  } else {
    cols[2] = getColWidth(right, size);
  }

  if (isTrue(left.floating) || !left.present) {
    // drop first column
    [0,1,2].forEach(i => areas[i].splice(0,1))
    cols.splice(0,1);
  } else {
    cols[0] = getColWidth(left, size);
  }

  if (isTrue(footer.floating) || !footer.present) {
    rows.splice(2,1);
    areas.splice(2,1);
  } else {
    rows[2] = footer.height;
  } 

  if (isTrue(header.floating) || !header.present) {
    rows.splice(0,1);
    areas.splice(0,1);
  } else {
    rows[0] = header.height;
  }

  if (rows.length === 1) rows[0] = '1fr';
  if (cols.length === 1) cols[0] = '1fr';

  return `
    grid-template-columns: ${cols.join(' ')};
    grid-template-rows: ${rows.join(' ')};
    grid-template-areas: "${areas.map(row => row.join(" ")).join('" "')}";
  `
}

const setData = (area, props) => {
  area.present = true;
  ['width', 'height', 'floating', 'collapse', 'collapseWidth', 'collapseHeight'].forEach(k => {
    if (!isNull(props[k]) && props[k] !== 'auto') {
      area[k] = props[k];
    }
  });    
}


const Container = styled.div`
  display: grid;
  ${props => getTemplate('small', props.areas, props.header, props.footer, props.left, props.right, props.body)}
  height: 100vh;
  overflow-x: hidden;

  @media only screen and (min-width: 46.875em) {
    ${props => getTemplate('large', props.areas, props.header, props.footer, props.left, props.right, props.body)}
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: ${props => props.show ? '1' : '0'};
  transform: translateX(${props => props.show ? '0' : '-100%'});
  transition: opacity 0.6s ease-in${props => props.show ? '' : ', transform 0s linear 0.6s'};
`

const Dashboard = React.memo(props => {
  
  const [state, service] = useDashboardService({
    left: {
      floating: isMobile(),
      collapse: 'auto',
      width: null,
      collapseWidth: '50px'
    },
    right: {
      floating: isMobile(),
      collapse: 'auto',
      width: null,
      collapseWidth: '50px'
    },
    header: {
      floating: isMobile(),
      collapse: 'auto',
      height: '50px',
      collapseHeight: '0'
    },
    footer: {
      floating: isMobile(),
      collapse: 'auto',
      height: '64px',
      collapseHeight: '0'
    },
    body: {}            
  });
  
  const areas = [
    ["none", "none", "none"],
    ["none", "none", "none"],
    ["none", "none", "none"]
  ];

  let showOverlay = false;

  const left = Object.assign({}, state.left)
  const right = Object.assign({}, state.right)
  const header = Object.assign({}, state.header)
  const footer = Object.assign({}, state.footer) 
  const body =  Object.assign({}, state.body)  

  // scan children and get useful data to create the grid container
  if (props.children) {
    React.Children.toArray(props.children).forEach(child => {
      const type = child.type.$dashboardType;
      switch (type) {
        case "header":
          fillRow(areas, 0, "header");
          setData(header, child.props); 
          break;
        case "footer":
          fillRow(areas, 2, "footer");
          setData(footer, child.props);          
          break;
        case "left":
          fillColumn(areas, 0, "left");
          setData(left, child.props);
          if (isNull(left.width)) {
            left.width = get(child.props, 'initialWidth', '200px');
          }
          break;          
        case "right":
          fillColumn(areas, 2, "right");
          setData(right, child.props);
          right.present = true;        
          if (isNull(right.width)) {
            right.width = get(child.props, 'initialWidth', '200px');
          }          
          break;
        case "body":
          body.present = true;
          areas[1][1] = "body";
          break;
        default:
          throw Error(
            "Unknown child for component Dashboard. Only DashboardHeader, DashboardFooter, DashboardLeft, DashboardRight and DashboardBody are supported as direct children of Dashboard"
          );
      }
    });
  }

  [right, left, header, footer].forEach(area => {
    if (isTrue(area.floating) && isFalse(area.collapse)) {
      showOverlay = true;
    }
  })

  const dashboard = {left, right, header, footer, body}
  service.data = dashboard;

  return (
    <DashboardContext.Provider value={{dashboard, service}}>
      <Container
        areas={areas}
        header={header}
        footer={footer}
        left={left}
        right={right}
        body={body}
      >
        <Overlay show={showOverlay} onClick={() => service.collapse('all')} />
        {props.children}
      </Container>
    </DashboardContext.Provider>
  );
});

export default Dashboard;
