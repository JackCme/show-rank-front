import { Button, Toggle } from 'react-daisyui';

interface Props {
  title: string;
  data?: any[];
}
export default function RelatedKeywordTable({ title, data }: Props) {
  return (
    <table className="table table-zebra w-full lg:w-auto">
      <thead>
        <tr>
          <th className="text-lg" colSpan={2}>
            {title}
          </th>
          <th className="text-right">
            <Button color="primary" size="xs">
              전체추가
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            <th>{index + 1}</th>
            <td>{item}</td>
            <td className="flex items-center justify-end">
              <Toggle />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
