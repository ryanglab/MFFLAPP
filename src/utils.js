import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

export const sortIcons = {
  'ASC': <FontAwesomeIcon icon={faCaretUp} />,
  'DESC': <FontAwesomeIcon icon={faCaretDown} />
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