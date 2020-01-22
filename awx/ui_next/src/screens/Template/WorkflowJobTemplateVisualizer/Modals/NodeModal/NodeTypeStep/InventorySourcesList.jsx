import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { withI18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { func, shape } from 'prop-types';
import { InventorySourcesAPI } from '@api';
import { getQSConfig, parseQueryString } from '@util/qs';
import PaginatedDataList from '@components/PaginatedDataList';
import DataListToolbar from '@components/DataListToolbar';
import CheckboxListItem from '@components/CheckboxListItem';

const QS_CONFIG = getQSConfig('inventory_sources', {
  page: 1,
  page_size: 5,
  order_by: 'name',
});

function InventorySourcesList({
  history,
  i18n,
  nodeResource,
  onUpdateNodeResource,
}) {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [inventorySources, setInventorySources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setInventorySources([]);
      setCount(0);
      const params = parseQueryString(QS_CONFIG, history.location.search);
      try {
        const { data } = await InventorySourcesAPI.read(params);
        setInventorySources(data.results);
        setCount(data.count);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [history.location]);

  return (
    <PaginatedDataList
      contentError={error}
      hasContentLoading={isLoading}
      itemCount={count}
      items={inventorySources}
      onRowClick={row => onUpdateNodeResource(row)}
      qsConfig={QS_CONFIG}
      showPageSizeOptions={false}
      renderItem={item => (
        <CheckboxListItem
          isSelected={!!(nodeResource && nodeResource.id === item.id)}
          itemId={item.id}
          key={item.id}
          name={item.name}
          label={item.name}
          onSelect={() => onUpdateNodeResource(item)}
          onDeselect={() => onUpdateNodeResource(null)}
          isRadio
        />
      )}
      renderToolbar={props => <DataListToolbar {...props} fillWidth />}
      toolbarColumns={[
        {
          name: i18n._(t`Name`),
          key: 'name',
          isSortable: true,
          isSearchable: true,
        },
      ]}
    />
  );
}

InventorySourcesList.propTypes = {
  nodeResource: shape(),
  onUpdateNodeResource: func.isRequired,
};

InventorySourcesList.defaultProps = {
  nodeResource: null,
};

export default withI18n()(withRouter(InventorySourcesList));
