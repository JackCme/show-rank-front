import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Input, InputGroup, Select } from 'react-daisyui';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import DataTable from '~/components/DataTable';

const defaultBy = 'keyword';

function KeywordSearch() {
  return (
    <motion.div
      key="keywordSearch"
      className="form-control"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <InputGroup className="mb-2">
        <Input
          type="text"
          placeholder="상품 종류를 입력하세요"
          bordered
          className="flex-1"
        />
        <Button shape="square">
          <AiOutlineSearch className="h-6 w-6" />
        </Button>
      </InputGroup>
    </motion.div>
  );
}

function CategorySearch() {
  const [cate1, setCate1] = useState('');
  const [cate2, setCate2] = useState('');
  const [cate3, setCate3] = useState('');

  const handleCate1Change = (value: string) => {
    setCate1(value);
    setCate2('');
    setCate3('');
  };

  const handleCate2Change = (value: string) => {
    setCate2(value);
    setCate3('');
  };

  return (
    <motion.div
      key="categorySearch"
      className="form-control"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <Select value={cate1} onChange={handleCate1Change} className="mb-2">
        <Select.Option value="" disabled>
          1차 카테고리 선택
        </Select.Option>
        <Select.Option value="1">카테고리1</Select.Option>
        <Select.Option value="2">카테고리2</Select.Option>
      </Select>
      <AnimatePresence>
        {cate1 && (
          <motion.div
            key="cate2"
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ x: -400 }}
          >
            <Select
              value={cate2}
              onChange={handleCate2Change}
              className="mb-2 w-full"
            >
              <Select.Option value="" disabled>
                2차 카테고리 선택
              </Select.Option>
              <Select.Option value="1">{`카테고리${cate1}-1`}</Select.Option>
              <Select.Option value="2">{`카테고리${cate1}-2`}</Select.Option>
            </Select>
          </motion.div>
        )}
        {cate2 && (
          <motion.div
            key="cate3"
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ x: -400 }}
          >
            <Select value={cate3} onChange={setCate3} className="mb-2 w-full">
              <Select.Option value="" disabled>
                3차 카테고리 선택
              </Select.Option>
              <Select.Option value="1">{`카테고리${cate1}-${cate2}-1`}</Select.Option>
              <Select.Option value="2">{`카테고리${cate1}-${cate2}-2`}</Select.Option>
            </Select>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function NaverSearch() {
  const router = useRouter();
  const [searchBy, setSearchBy] = useState(router.query.by || defaultBy);

  const handleSearchBy = (by: string) => {
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
          active={searchBy === 'keyword'}
          onClick={() => handleSearchBy('keyword')}
        >
          키워드로 찾기
        </Button>
        <Button
          active={searchBy === 'category'}
          onClick={() => handleSearchBy('category')}
        >
          카테고리로 찾기
        </Button>
      </ButtonGroup>
      <AnimatePresence>
        {searchBy === 'keyword' && <KeywordSearch key="keyword" />}
        {/* {searchBy === 'category' && <div>HEllo World!</div>} */}
        {searchBy === 'category' && <CategorySearch key="category" />}
      </AnimatePresence>
      <DataTable />
    </div>
  );
}
