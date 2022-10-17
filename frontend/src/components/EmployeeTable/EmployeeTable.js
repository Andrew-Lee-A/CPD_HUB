import { useState, useEffect } from 'react'
import {
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  TableSortLabel,
  TextField,
  Toolbar,
  Paper,
  tableCellClasses,
  InputAdornment,
  styled,
} from '@mui/material'
import theme from './theme'
import { Search } from '@mui/icons-material'

const ROWS_PER_PAGE = 5

const TableCellVariant = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: '#0b1e47',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: '#0b1e47',
    color: theme.palette.common.white,
  },
  [`$.${tableCellClasses.body}`]: {
    fontSize: '14',
  },
}))

const TablePaginationVariant = styled(TablePagination)(({ theme }) => ({
  backgroundColor: '#0b1e47',
  color: theme.palette.common.white,
}))

const StyledLabel = styled(TableSortLabel)(({ theme }) => ({
  '&.MuiTableSortLabel-root': { 
    color: 'white',
    },
  '&.MuiTableSortLabel-root:hover': { color: '#29D6B5' },
  '&.Mui-active': { color: '#29D6B5' },
  '& .MuiTableSortLabel-icon': { color: '#29D6B5!important' },
}))

const SearchTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: '#0b1e47',
    width: '40%',
    margin: '2px',


  '& label.Mui-focused': {
    color: '#29D6B5',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#29D6B5',
  },
  '&:hover label': {
    color: '#29D6B5',
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: '#29D6B5',
  },
  '& .MuiInputAdornment-root': {
    color: 'white',
  },
  input: {
    color: 'white',
  },
  label: {
    color: '#29D6B5',
  },
}))

function Input(props) {
  const { name, label, value, error = null, onChange, ...other } = props
  return (
    <SearchTextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}

const EmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [articles, setArticles] = useState([])

  //sorting const
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

  //search filter const
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items
    },
  })

//   useEffect(() => {
//     async function getArticles() {
//       const { data } = await axios('/api/v1/article')
//       setArticles(data)
//     }

//     getArticles()
//   }, []) // on mount

  //sort function
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) {
        return order
      }
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function descendingComparator(a, b, orderBy) {
    //a and b are the rows we are comparing. orderby is the field so we comparing a and b on.
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }

    return 0
  }

  const handleSortRequest = (cell_ID) => {
    const isAsc = orderBy === cell_ID && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(cell_ID)
  }

  const handleNextPage = (e, page) => {
    setCurrentPage(page)
  }

  const handleSearch = (e) => {
    let target = e.target
    console.log(target.value)
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items
        else
          return items.filter((x) =>
            x.title
              .toString()
              .toLowerCase()
              .includes(target.value.toLowerCase())
          )
      },
    })
  }

  return (
    <>
      <Stack direction='row' gap='3rem'>
        <div>
          <Toolbar>
            <Input
              variant='outlined'
              label='Search by Employee Name'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </Toolbar>
          <TableContainer>
            <Table aria-label='software development process article table'>
              <TableHead>
                <TableRow>
                  <TableCellVariant
                    id='title'
                    sortDirection={orderBy === 'title' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'title'}
                      direction={orderBy === 'title' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('title')
                      }}
                    >
                      Employee ID
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='authors'
                    sortDirection={orderBy === 'authors' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'authors'}
                      direction={orderBy === 'authors' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('authors')
                      }}
                    >
                      Name
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='source'
                    sortDirection={orderBy === 'source' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'source'}
                      direction={orderBy === 'source' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('source')
                      }}
                    >
                      Line of Business
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='pubYear'
                    sortDirection={orderBy === 'pubYear' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'pubYear'}
                      direction={orderBy === 'pubYear' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('pubYear')
                      }}
                    >
                      Discipline
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='doi'
                    sortDirection={orderBy === 'doi' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'doi'}
                      direction={orderBy === 'doi' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('doi')
                      }}
                    >
                      Seniority
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='claimedBenefit'
                    sortDirection={orderBy === 'claimedBenefit' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'claimedBenefit'}
                      direction={orderBy === 'claimedBenefit' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('claimedBenefit')
                      }}
                    >
                      Cycle Date
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='levelOfEvidence'
                    sortDirection={
                      orderBy === 'levelOfEvidence' ? order : false
                    }
                  >
                    <StyledLabel
                      active={orderBy === 'levelOfEvidence'}
                      direction={orderBy === 'levelOfEvidence' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('levelOfEvidence')
                      }}
                    >
                      Push frequency
                    </StyledLabel>
                    <StyledLabel
                      active={orderBy === 'levelOfEvidence'}
                      direction={orderBy === 'levelOfEvidence' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('levelOfEvidence')
                      }}
                    >
                      Progress %
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant></TableCellVariant>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(
                  filterFn.fn(articles),
                  getComparator(order, orderBy)
                )
                  .slice(
                    currentPage * ROWS_PER_PAGE,
                    currentPage * ROWS_PER_PAGE + ROWS_PER_PAGE
                  )
                  .map((item) => {
                    return (
                      <TableRow key={item.doi} hover>
                        <TableCellVariant>{item.title}</TableCellVariant>
                        <TableCellVariant>{item.authors}</TableCellVariant>
                        <TableCellVariant>{item.source}</TableCellVariant>
                        <TableCellVariant>{item.pubYear}</TableCellVariant>
                        <TableCellVariant>{item.doi}</TableCellVariant>
                        <TableCellVariant>
                          {item.claimedBenefit}
                        </TableCellVariant>
                        <TableCellVariant>
                          {item.levelOfEvidence}
                        </TableCellVariant>
                      </TableRow>
                    )
                  })}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
            <TablePaginationVariant
              color={theme.palette.secondary.main}
              rowsPerPageOptions={[]}
              component={Paper}
              page={currentPage}
              rowsPerPage={ROWS_PER_PAGE}
              onPageChange={handleNextPage}
              count={articles.length}
              colSpan={8}
            />
          </TableContainer>
        </div>
      </Stack>
    </>
  )
}

export default EmployeeTable