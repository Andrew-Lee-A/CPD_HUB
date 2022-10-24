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
import { useAuthContext } from "../../hooks/useAuthContext";

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

const calculateCPDPoints = (cpdSummary) => {
  console.log(cpdSummary)
  const values = Object.values(cpdSummary);

  const sum = values.reduce((accumulator, value) => {
      return accumulator + value;
  }, 0);

  return sum
}
const EmployeeTable = () => {
  const { user } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(0)
  const [employees, setEmployees] = useState([])

  //sorting const
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

  //search filter const
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items
    },
  })

  useEffect(() => {
    async function getEmployees() {
      const response = await fetch('/api/employees', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      const json = await response.json();

      if (response.ok){
        setEmployees(json)
      }
    }

    
    getEmployees()
  }, []) // on mount

  //sort function
  function stableSort(array, comparator) {
    console.log(array)
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
                    id='_id'
                    sortDirection={orderBy === '_id' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === '_id'}
                      direction={orderBy === '_id' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('_id')
                      }}
                    >
                      Employee ID
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='prefferedName'
                    sortDirection={orderBy === 'prefferedName' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'prefferedName'}
                      direction={orderBy === 'prefferedName' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('prefferedName')
                      }}
                    >
                      Full Name
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='lineOfBusiness'
                    sortDirection={orderBy === 'lineOfBusiness' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'lineOfBusiness'}
                      direction={orderBy === 'lineOfBusiness' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('lineOfBusiness')
                      }}
                    >
                      Line of Business
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='discipline'
                    sortDirection={orderBy === 'discipline' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'discipline'}
                      direction={orderBy === 'discipline' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('discipline')
                      }}
                    >
                      Discipline
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='seniority'
                    sortDirection={orderBy === 'seniority' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'seniority'}
                      direction={orderBy === 'seniority' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('seniority')
                      }}
                    >
                      Position
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='cycleStartDate'
                    sortDirection={orderBy === 'cycleStartDate' ? order : false}
                  >
                    <StyledLabel
                      active={orderBy === 'cycleStartDate'}
                      direction={orderBy === 'cycleStartDate' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('cycleStartDate')
                      }}
                    >
                      CPEng Chartered Date
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant
                    id='pushFrequency'
                    sortDirection={
                      orderBy === 'pushFrequency' ? order : false
                    }
                  >
                    <StyledLabel
                      active={orderBy === 'pushFrequency'}
                      direction={orderBy === 'pushFrequency' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('pushFrequency')
                      }}
                    >
                      CPD Points
                    </StyledLabel>
                  </TableCellVariant>
                  <TableCellVariant>
                  <StyledLabel
                      active={orderBy === 'levelOfEvidence'}
                      direction={orderBy === 'levelOfEvidence' ? order : 'asc'}
                      onClick={() => {
                        handleSortRequest('levelOfEvidence')
                      }}
                    >
                      Progress Tracking
                    </StyledLabel>
                  </TableCellVariant>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(
                  filterFn.fn(employees),
                  getComparator(order, orderBy)
                )
                  .slice(
                    currentPage * ROWS_PER_PAGE,
                    currentPage * ROWS_PER_PAGE + ROWS_PER_PAGE
                  )
                  .map((item) => {
                    return (
                      <TableRow key={item._id} hover>
                        <TableCellVariant>{item._id}</TableCellVariant>
                        <TableCellVariant>{item.userDetails.prefferedName}</TableCellVariant>
                        <TableCellVariant>{item.userDetails.lineOfBusiness}</TableCellVariant>
                        <TableCellVariant>{item.userDetails.discipline}</TableCellVariant>
                        <TableCellVariant>{item.userDetails.seniority}</TableCellVariant>
                        <TableCellVariant>{new Date(item.userDetails.cycleStartDate.toString()).toLocaleString('en-NZ', {timezone: 'NZST'})}</TableCellVariant>
                        <TableCellVariant>
                          {calculateCPDPoints(item.cpdSummary)}
                        </TableCellVariant>
                        <TableCellVariant>
                          On track
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
              count={employees.length}
              colSpan={8}
            />
          </TableContainer>
        </div>
      </Stack>
    </>
  )
}

export default EmployeeTable