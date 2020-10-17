import React, { useState, useEffect } from 'react';

import { map, prop, sum, pipe } from 'ramda';

import {
  TableContainer,
  TableRow,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import {
  useRequest,
  getData,
  ListingModel,
  Column,
  ColumnType,
} from '@centreon/ui';

import {
  labelSomethingWentWrong,
  labelYes,
  labelNo,
} from '../../../../translatedLabels';

const getYesNoLabel = (value: boolean): string => (value ? labelYes : labelNo);

interface DetailsTableColumn extends Column {
  id: string;
  label: string;
  type: ColumnType;
  getContent: (details) => string | JSX.Element;
  width: number;
}

export interface DetailsTableProps {
  endpoint: string;
  columns: Array<DetailsTableColumn>;
}

const DetailsTable = <TDetails extends unknown>({
  endpoint,
  columns,
}: DetailsTableProps): JSX.Element => {
  const [details, setDetails] = useState<Array<TDetails> | null>();

  const { sendRequest } = useRequest<ListingModel<TDetails>>({
    request: getData,
  });

  useEffect(() => {
    sendRequest(endpoint).then((retrievedDetails) =>
      setDetails(retrievedDetails.result),
    );
  }, []);

  const loading = details === undefined;
  const error = details === null;
  const success = !loading && !error;

  const tableMaxWidth = pipe(map(prop('width')), sum)(columns);

  return (
    <TableContainer component={Paper}>
      <Table size="small" style={{ width: tableMaxWidth }}>
        <TableHead>
          <TableRow>
            {columns.map(({ label }) => (
              <TableCell key={label}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Skeleton height={20} animation="wave" />
              </TableCell>
            </TableRow>
          )}
          {success &&
            details?.map((detail, index) => (
              <TableRow key={index.toString()}>
                {columns.map(({ label, getContent, width }) => (
                  <TableCell key={label} style={{ maxWidth: width }}>
                    <span>{getContent?.(detail)}</span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {error && (
            <TableRow>
              <TableCell align="center" colSpan={columns.length}>
                <span>{labelSomethingWentWrong}</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { getYesNoLabel };
export default DetailsTable;
