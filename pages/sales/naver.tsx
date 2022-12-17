import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-daisyui';
import DataTable from '~/components/DataTable';
import KeywordSearch from '~/components/KeywordSearch';
import { motion } from 'framer-motion';

type byType = 'store' | 'keyword';
const defaultBy: byType = 'store';
export default function NaverSales() {
  const router = useRouter();
  const [searchBy, setSearchBy] = useState(router.query.by || defaultBy);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchStore, setSearchStore] = useState('');
  const [tabValue, setTabValue] = useState(-1);
  const [data, setData] = useState<number[]>([]);

  const handleSearchBy = (by: byType) => {
    setSearchBy(by);
    router.push({
      pathname: router.pathname,
      query: { by },
    });
  };

  useEffect(() => {
    setSearchBy(router.query.by || defaultBy);
  }, [router.query.by]);

  return (
    <div className="p-5">
      {/* 버튼 영역 */}
      <ButtonGroup className="mb-10 w-full justify-center lg:w-auto">
        <Button
          active={searchBy === 'store'}
          onClick={() => handleSearchBy('store')}
        >
          스토어로 분석
        </Button>
        <Button
          active={searchBy === 'keyword'}
          onClick={() => {
            setSearchKeyword('');
            handleSearchBy('keyword');
          }}
        >
          키워드로 분석
        </Button>
      </ButtonGroup>
      <AnimatePresence>
        {searchBy === 'store' && (
          <KeywordSearch
            key="storeInput"
            placeholder="상세페이지 URL을 입력해주세요"
            onSearch={(val) => {
              setSearchStore(val);
              setTabValue(0);
              setData([1]);
            }}
          />
        )}
        {searchBy === 'keyword' && (
          <KeywordSearch
            key="keywordInput"
            placeholder="키워드를 입력해주세요"
            onSearch={(val) => {
              setSearchKeyword(val);
              setTabValue(0);
              setData([1]);
            }}
          />
        )}
        {data.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            // exit={{ opacity: 0, scale: 0.5 }}
            key="랭크요약2"
          >
            <div className="text-lg font-bold">판매량 조회</div>
            <DataTable />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
