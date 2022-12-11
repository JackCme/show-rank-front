import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  Select,
  Tabs,
} from 'react-daisyui';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineSearch } from 'react-icons/ai';
import DataTable from '~/components/DataTable';

const defaultBy = 'keyword';

interface KeywordSearchProps {
  onSearch?: (keyword: string) => void;
}

function KeywordSearch({ onSearch }: KeywordSearchProps) {
  const [keyword, setKeyword] = useState('');

  const handleSearchClick = () => {
    if (onSearch) onSearch(keyword);
  };
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(keyword);
    }
  };

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
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        <Button shape="square" onClick={handleSearchClick}>
          <AiOutlineSearch className="h-6 w-6" />
        </Button>
      </InputGroup>
    </motion.div>
  );
}

interface CategorySearchProps {
  onSearch?: (category: string) => void;
}

function CategorySearch({ onSearch }: CategorySearchProps) {
  const [cate1, setCate1] = useState('');
  const [cate2, setCate2] = useState('');
  const [cate3, setCate3] = useState('');

  const handleCate1Change = (value: string) => {
    if (onSearch) onSearch(value);
    setCate1(value);
    setCate2('');
    setCate3('');
  };

  const handleCate2Change = (value: string) => {
    if (onSearch) onSearch(`${cate1}/${value}`);
    setCate2(value);
    setCate3('');
  };

  const handleCate3Change = (value: string) => {
    if (onSearch) onSearch(`${cate1}/${cate2}/${value}`);
    setCate3(value);
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
            <Select
              value={cate3}
              onChange={handleCate3Change}
              className="mb-2 w-full"
            >
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
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [tabValue, setTabValue] = useState(-1);

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
          onClick={() => {
            setSearchKeyword('');
            handleSearchBy('category');
          }}
        >
          카테고리로 찾기
        </Button>
      </ButtonGroup>
      <AnimatePresence>
        {searchBy === 'keyword' && (
          <KeywordSearch
            key="keyword"
            onSearch={(keyword) => {
              setSearchKeyword(keyword);
              setTabValue(0);
            }}
          />
        )}
        {searchBy === 'category' && (
          <CategorySearch
            key="category"
            onSearch={(category) => {
              setSearchCategory(category);
              setTabValue(0);
            }}
          />
        )}
        {(searchKeyword || searchCategory) && (
          <motion.div
            key="tabs"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <Tabs
              value={tabValue}
              onChange={setTabValue}
              boxed
              className="justify-center mb-2 lg:justify-start"
              size="md"
            >
              <Tabs.Tab value={0}>랭크요약</Tabs.Tab>
              <Tabs.Tab value={1}>TOP랭크</Tabs.Tab>
              <Tabs.Tab value={2}>예상광고비</Tabs.Tab>
              <Tabs.Tab value={3}>연관검색어</Tabs.Tab>
            </Tabs>
          </motion.div>
        )}

        {/* <motion.div
          key="랭크요약"
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ x: 1000 }}
        >
          {tabValue === 0 && <DataTable />}
          {tabValue === 1 && <DataTable />}
        </motion.div> */}
        {tabValue === 0 && (
          <motion.div
            key="랭크요약"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            // exit={{ opacity: 0, scale: 0.5 }}
          >
            <DataTable />
          </motion.div>
        )}
        {tabValue === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            // exit={{ opacity: 0, scale: 0.5 }}
            key="랭크요약2"
          >
            <DataTable />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
