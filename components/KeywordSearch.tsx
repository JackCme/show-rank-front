import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Input, InputGroup } from 'react-daisyui';
import { AiOutlineSearch } from 'react-icons/ai';

interface KeywordSearchProps {
  onSearch?: (keyword: string) => void;
  placeholder?: string;
}

export default function KeywordSearch({
  onSearch,
  placeholder,
}: KeywordSearchProps) {
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
          placeholder={placeholder}
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
