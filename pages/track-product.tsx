import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Checkbox, Divider, Stats } from 'react-daisyui';

const defaultBy = 'rank';

export default function TrackProduct() {
  const router = useRouter();
  const [trackBy, setTrackBy] = useState(router.query.by || defaultBy);

  const handleTrackBy = (by: string) => {
    setTrackBy(by);
    router.push({
      pathname: router.pathname,
      query: { by },
    });
  };

  useEffect(() => {
    setTrackBy(router.query.by || defaultBy);
  }, [router.query.by]);

  return (
    <div className="p-5">
      {/* 버튼 영역 */}
      <ButtonGroup className="mb-10 w-full justify-center lg:w-auto">
        <Button
          active={trackBy === 'rank'}
          onClick={() => handleTrackBy('rank')}
        >
          상품순위 추적
        </Button>
        <Button
          active={trackBy === 'price'}
          onClick={() => handleTrackBy('price')}
        >
          상품가격 추적
        </Button>
      </ButtonGroup>
      {trackBy === 'rank' && (
        <AnimatePresence>
          <motion.div
            key="asdfadsf"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row gap-2">
              <Stats className="w-full shadow-lg ">
                <Stats.Stat>
                  <Stats.Stat.Item variant="title" className="text-sm">
                    등록 상품 수
                  </Stats.Stat.Item>
                  <Stats.Stat.Item variant="value" className="flex items-end">
                    <span className="flex-1">1개</span>
                    <span className="text-xs">/20</span>
                  </Stats.Stat.Item>
                  <Stats.Stat.Item variant="desc"></Stats.Stat.Item>
                </Stats.Stat>
              </Stats>
              <Stats className="w-full shadow-lg ">
                <Stats.Stat>
                  <Stats.Stat.Item variant="title" className="text-sm">
                    등록 키워드 수
                  </Stats.Stat.Item>
                  <Stats.Stat.Item variant="value" className="flex items-end">
                    <span className="flex-1">1개</span>
                    <span className="text-xs">/100</span>
                  </Stats.Stat.Item>
                  <Stats.Stat.Item variant="desc"></Stats.Stat.Item>
                </Stats.Stat>
              </Stats>
            </div>
          </motion.div>
          <Divider />
          <div>
            <div className="relative border border-zinc-300 border-dashed p-2 w-full lg:w-auto">
              <Checkbox size="lg" className="absolute" />
              <div className="flex gap-1">
                <Image
                  src="https://via.placeholder.com/150.png"
                  alt="product image"
                  width={150}
                  height={150}
                />
                <div className="flex flex-col">
                  <span>
                    (감사세일) 한국판 납작복숭아 대극천 대극천복숭아 복숭아
                    프리미엄 고당도
                  </span>
                  <div className="flex flex-col">
                    <span>가격</span>
                    <span>29,000</span>
                    <span>리뷰</span>
                    <span>846개</span>
                    <span>리뷰평점</span>
                    <span>4.8점</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
