import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faLessThan } from '@fortawesome/free-solid-svg-icons';

export const sortIcons = {
  'ASC': <FontAwesomeIcon icon={faCaretUp} />,
  'DESC': <FontAwesomeIcon icon={faCaretDown} />
};

export const filterRookies = (array, { sort, order, num, positions }) => {
  let count = 0;
  return array.filter((x, indx) => {
    if (count >= num) {
      return false;
    } else {
      if (positions.includes(x.pos)) {
        count++;
        return x;
      }
    }
  }).sort((a, b) => {
    if (order === 'ASC') {
      return (a[sort] > b[sort]) ? 1 : (a[sort] < b[sort]) ? -1 : 0;
    }
    else if (order === 'DESC') {
      return (a[sort] < b[sort]) ? 1 : (a[sort] > b[sort]) ? -1 : 0;
    }
    else {
      return 0;
    }
  });
};

export const filterPlayers = (array, { sort, order, num, availability, positions }) => {
  let count = 0;
  return array.filter((x, indx) => {
    if (count >= num) {
      return false;
    } else {
      if (positions.includes(x.pos) && (
        availability === 'all' ||
        availability === 'available' && x.fslug === null ||
        availability === 'rfas' && x.type === 'RFA' && x['2021'] == 0 ||
        availability === 'tags' && (x.type === 'EFT' || x.type === 'NFT' || x.type === 'TT'))
      ) {
        count++;
        return x;
      }
    }
  }).sort((a, b) => {
    if (order === 'ASC') {
      return (a[sort] > b[sort]) ? 1 : (a[sort] < b[sort]) ? -1 : 0;
    }
    else if (order === 'DESC') {
      return (a[sort] < b[sort]) ? 1 : (a[sort] > b[sort]) ? -1 : 0;
    }
    else {
      return 0;
    }
  });
};

export const getFranchiseTitle = (franchises, slug) => {
  if (franchises && slug) {
    const franchise = franchises.filter((f) => {
      return f.slug === slug;
    });
    return (franchise.length) ? `${franchise[0].team} ${franchise[0].name}` : 'Franchise';
  }
};

export const loadMore = ({ key, num }) => {
  return {
    type: 'LOAD_MORE',
    key,
    num
  }
};

export const sortArray = (array, { sort, order }) => {
  return array.sort((a, b) => {
    if (order === 'ASC') {
      return (a[sort] > b[sort]) ? 1 : (a[sort] < b[sort]) ? -1 : 0;
    }
    else if (order === 'DESC') {
      return (a[sort] < b[sort]) ? 1 : (a[sort] > b[sort]) ? -1 : 0;
    }
    else {
      return 0;
    }
  });
};

export const sortBy = ({ key, sort, order, props }) => {
  const sortKey = props.currentTarget.attributes['data-key'].value;
  order = (sort !== sortKey) ? order : (order === 'ASC') ? 'DESC' : 'ASC';
  sort = sortKey;
  return {
    type: 'SORT_BY',
    key,
    sort,
    order
  }
};

export const taggedPlayers = (array) => {
  return array.filter((a) => {
    return a.type === 'EFT' || a.type === 'NFT' || a.type === 'TT';
  });
};

export const setScrollPosition = (props) => {
  const pathName = props.location.pathname;
  const scrollBody = document.querySelector('#main');
  const scrollTop = scrollBody ? scrollBody.scrollTop : 0;
  // parse sessionStorage['appData'] as actual object
  let appData = JSON.parse(sessionStorage['appData']);
  // does the current component exist in the components array?
  let currentComponent = appData.components.find(x => x.path == pathName);
  // if NOT exists
  if (!currentComponent) {
    // set currentComponent to new object
    currentComponent = { path: pathName, scrollTop: scrollTop };
    // add component to appData
    appData.components.push(currentComponent);
    // update sessionStorage
    sessionStorage.setItem('appData', JSON.stringify(appData));
  }
  // set scrollBody scrollTop
  scrollBody.scrollTop = currentComponent.scrollTop;
};

export const updateScrollPosition = (props) => {
  const pathName = props.location.pathname;
  const scrollBody = document.querySelector('#main');
  const scrollTop = scrollBody ? scrollBody.scrollTop : 0;
  if (pathName) {
    // parse sessionStorage['appData'] as actual object
    let appData = JSON.parse(sessionStorage['appData']);
    // does the current component exist in the components array?
    let currentComponent = appData.components.find(x => x.path == pathName);
    // if component exists, update it
    if (currentComponent) {
      // update currentComponent scrollTop
      currentComponent.scrollTop = scrollTop;
      // update sessionStorage
      sessionStorage.setItem('appData', JSON.stringify(appData));
    }
  }
};