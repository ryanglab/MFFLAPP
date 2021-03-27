import React from 'react';

class Table extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    const array = this.props.array;
    const table = this.props.table;
    return (
      <table>
        {table.thead &&
          <thead className={table.thead.className}>
            {
              table.thead.rows.map((row, r) => {
                return (
                  <tr key={r}>
                    {
                      row.cells.map((cell, c) => {
                        return (
                          <th
                            className={cell.className}
                            colSpan={cell.colSpan}
                            key={c}
                          >
                            {cell.text}
                          </th>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </thead>
        }
        {table.tbody &&
          <tbody className={table.tbody.className}>
            {
              // loop through array
              array.map((row, r) => {
                return (
                  <tr key={r}>
                    {table.tbody.rows.length > 0 &&
                      // loop through cells
                      table.tbody.rows[0].cells.map((cell, c) => {
                        return (
                          <td
                            className={cell.className}
                            colSpan={cell.colSpan}
                            key={c}
                          >
                            {cell.text ? cell.text : array[r][cell.keyValue]}
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
              // table.tbody.rows.map((row, r) => {
              //   return (
              //     <tr key={r}>
              //       {
              //         row.cells.map((cell, c) => {
              //           return (
              //             <td
              //               className={cell.className}
              //               colSpan={cell.colSpan}
              //               key={c}
              //             >
              //               {cell.text ? cell.text : array[c][cell.keyValue]}
              //             </td>
              //           );
              //         })
              //       }
              //     </tr>
              //   );
              // })
            }
          </tbody>
        }
      </table>
    );
  }
}

export default Table;