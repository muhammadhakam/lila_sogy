import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot
} from "firebase/firestore";
import {db} from "../firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { CSVLink} from "react-csv"
import "./Datatable.css"

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {

     const unsub = onSnapshot(
        collection(db, "pasien"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
        },
        (error) => {
          console.log(error);
        }
      );
  
      return () => {
        unsub();
      };

  }, []);

  return (
    <div>
    <header className="header">
      ----LILA----
    </header>
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">Timestamp</TableCell>
          <TableCell className="tableCell">Nama</TableCell>
          <TableCell className="tableCell">Umur</TableCell>
          <TableCell className="tableCell">Kondisi</TableCell>
          <TableCell className="tableCell">Rekomendasi</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="tableCell">{data.created}</TableCell>
            <TableCell className="tableCell">{data.nama}</TableCell>
            <TableCell className="tableCell">{data.umur}</TableCell>
            <TableCell className="tableCell">{data.kondisi}</TableCell>
            <TableCell className="tableCell">{data.rekom}</TableCell>
            <TableCell className="tableCell">
              <span className={`status ${data.status}`}>{data.status}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <div className="tombol">
    <Link to="/">
    <button>
      back
    </button></Link>
    <CSVLink data={data}><button>Download</button></CSVLink>
  </div>
  </div>
  );
};

export default Datatable;