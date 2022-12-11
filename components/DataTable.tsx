import { Table } from 'react-daisyui';

export default function DataTable() {
  return (
    <div className="overflow-x-auto">
      <Table compact className="w-full">
        <Table.Head>
          <span />
          <span>Name</span>
          <span>Job</span>
          <span>Company</span>
          <span>Location</span>
          <span>Last Login</span>
          <span>Favorite Color</span>
        </Table.Head>

        <Table.Body>
          <Table.Row>
            <span>1</span>
            <span>Cy Ganderton</span>
            <span>Quality Control Specialist</span>
            <span>Littel, Schaden and Vandervort</span>
            <span>Canada</span>
            <span>12/16/2020</span>
            <span>Blue</span>
          </Table.Row>

          <Table.Row>
            <span>2</span>
            <span>Hart Hagerty</span>
            <span>Desktop Support Technician</span>
            <span>Zemlak, Daniel and Leannon</span>
            <span>United States</span>
            <span>12/5/2020</span>
            <span>Purple</span>
          </Table.Row>

          <Table.Row>
            <span>3</span>
            <span>Brice Swyre</span>
            <span>Tax Accountant</span>
            <span>Carroll Group</span>
            <span>China</span>
            <span>8/15/2020</span>
            <span>Red</span>
          </Table.Row>

          <Table.Row>
            <span>4</span>
            <span>Marjy Ferencz</span>
            <span>Office Assistant I</span>
            <span>Rowe-Schoen</span>
            <span>Russia</span>
            <span>3/25/2021</span>
            <span>Crimson</span>
          </Table.Row>

          <Table.Row>
            <span>5</span>
            <span>Yancy Tear</span>
            <span>Community Outreach Specialist</span>
            <span>Wyman-Ledner</span>
            <span>Brazil</span>
            <span>5/22/2020</span>
            <span>Indigo</span>
          </Table.Row>

          <Table.Row>
            <span>6</span>
            <span>Irma Vasilik</span>
            <span>Editor</span>
            <span>Wiza, Bins and Emard</span>
            <span>Venezuela</span>
            <span>12/8/2020</span>
            <span>Purple</span>
          </Table.Row>

          <Table.Row>
            <span>7</span>
            <span>Meghann Durtnal</span>
            <span>Staff Accountant IV</span>
            <span>Schuster-Schimmel</span>
            <span>Philippines</span>
            <span>2/17/2021</span>
            <span>Yellow</span>
          </Table.Row>

          <Table.Row>
            <span>8</span>
            <span>Sammy Seston</span>
            <span>Accountant I</span>
            <span>Hara, Welch and Keebler</span>
            <span>Indonesia</span>
            <span>5/23/2020</span>
            <span>Crimson</span>
          </Table.Row>

          <Table.Row>
            <span>9</span>
            <span>Lesya Tinham</span>
            <span>Safety Technician IV</span>
            <span>Turner-Kuhlman</span>
            <span>Philippines</span>
            <span>2/21/2021</span>
            <span>Maroon</span>
          </Table.Row>

          <Table.Row>
            <span>10</span>
            <span>Zaneta Tewkesbury</span>
            <span>VP Marketing</span>
            <span>Sauer LLC</span>
            <span>Chad</span>
            <span>6/23/2020</span>
            <span>Green</span>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
