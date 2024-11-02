import React, { useEffect, useState } from 'react';
import { SuiPriceServiceConnection } from '@pythnetwork/pyth-sui-js';
import Right from './right.png'
 const TokenCard = ({
  tokenImage,
  tokenName,
  tokenType,
  price,
  priceChange,
  chartImage,
  addressOrChart,
  isPricePositive
}) => {
  const handleCopyAddress = () => {
    if (typeof addressOrChart === 'string') {
      navigator.clipboard.writeText(addressOrChart);
    }
  };

  return (
    <section className="px-4 py-4 w-full bg-zinc-900">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col w-full">
            <div className="flex gap-2 self-start">
              <img 
                loading="lazy" 
                src={tokenImage} 
                alt={`${tokenName} token icon`} 
                className="object-contain shrink-0 w-7 rounded-2xl aspect-square" 
              />
              <div className="flex flex-col self-start">
                <h2 className="self-start text-sm font-semibold leading-4 text-white">
                  {tokenName}
                </h2>
                <p className="mt-2 text-xs leading-3 text-zinc-500">
                  {tokenType}
                </p>
              </div>
            </div>
            
            {typeof addressOrChart === 'string' ? (
              <div className="flex gap-6 px-2 py-0.5 mt-7 rounded bg-neutral-900">
                <p className="grow shrink my-auto w-32 text-sm leading-4 text-white text-opacity-50">
                  {addressOrChart}
                </p>
                        <a href='https://suivision.xyz/coin/0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC' target="_blank" rel="noopener noreferrer"                   className="flex flex-col items-start pl-1 min-h-[20px]"
                        >
 
                  {/* onClick={handleCopyAddress}
                  className="flex flex-col items-start pl-1 min-h-[20px]"
                  aria-label={`Copy ${tokenName} address`}
                > */}
                  <img 
                    loading="lazy" 
                    src={Right} 
                    alt="Copy icon" 
                    className="object-contain w-5 aspect-square" 
                  />
                </a>
              </div>
            ) : (
              <a href='/' target="_blank" rel="noopener noreferrer">
                 <img 
                loading="lazy" 
                src={Right} 
                alt={`${tokenName} price chart`} 
                className="object-contain mt-7 aspect-[5.38] w-[129px]" 
              />
              </a>
             
            )}
          </div>
        </div>

        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-1 w-full whitespace-nowrap">
            <div className="flex self-end">
              <div className="flex gap-1 p-0.5 h-full rounded-xl bg-neutral-900">
                <img 
                  loading="lazy" 
                  src={tokenImage} 
                  alt="" 
                  className="object-contain shrink-0 w-4 rounded-2xl aspect-square" 
                />
                <p className="text-sm leading-4 text-white">{price}</p>
                <p className={`my-auto text-xs leading-3 ${
                  isPricePositive ? 'text-teal-300' : 'text-rose-500'
                }`}>
                  {priceChange}
                </p>
              </div>
            </div>
            <img 
              loading="lazy" 
              src={chartImage} 
              alt={`${tokenName} detailed price chart`} 
              className="object-contain mt-2.5 aspect-[3.75] w-[180px]" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const PriceWidget = () => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  const connection = new SuiPriceServiceConnection(
    "http://hermes-beta.pyth.network"
  );

  const priceIds = [
    "0xf9c0172ba10dfa4d19088d94f5bf61d3b54d5bd7483a322a982e1373ee8ea31b",
    "0xca80ba6dc32e08d06f1aa886011eed1d77c77be9eb761cc10d72b7d0a2fd57a6",
  ];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const priceFeeds = await connection.getLatestPriceFeeds(priceIds);
        const newPrices = {};
        priceFeeds.forEach(feed => {
          const price = feed.getPriceNoOlderThan(60);
          const previousPrice = feed.getPriceNoOlderThan(120);
          const priceChange = previousPrice ? 
            ((price.price - previousPrice.price) / previousPrice.price) * 100 : 0;
          
          newPrices[feed.id] = {
            price: `$${(price.price * Math.pow(10, price.expo)).toFixed(4)}`,
            priceChange: `${priceChange > 0 ? '+' : ''}${priceChange.toFixed(2)}%`,
            isPricePositive: priceChange >= 0
          };
        });
        setPrices(newPrices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prices:', error);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  const tokens = [
    {
      tokenImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/d97f81d3447959d4396916d9fecc1355d678132d229492e6496fe1a46833d4d7?placeholderIfAbsent=true&apiKey=203bcbe6c7e54880ad9777d1b8d81a89",
      tokenName: "USDC",
      tokenType: "Native USDC",
      price: prices[priceIds[0]]?.price || "$0.9999",
      priceChange: prices[priceIds[0]]?.priceChange || "0%",
      chartImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/52b7d17bb6aab1a802b67958ee4c01f72fe4a4e50e97b4ca3fa75b98da7f8ed8?placeholderIfAbsent=true&apiKey=203bcbe6c7e54880ad9777d1b8d81a89",
      addressOrChart: "0xdba346 ... dc::USDC",
      isPricePositive: prices[priceIds[0]]?.isPricePositive ?? false
    },
    {
      tokenImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f109fdeb6fd23641e3459d8ff26eb39f8af2b55762e47c23aadd99bc09b6d7e?placeholderIfAbsent=true&apiKey=203bcbe6c7e54880ad9777d1b8d81a89",
      tokenName: "SUI",
      tokenType: "SUI Token",
      price: prices[priceIds[1]]?.price || "$2.01",
      priceChange: prices[priceIds[1]]?.priceChange || "+ 7.15%",
      chartImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/b149f66e0e07c1060127b465dc332ce196971139638809aecf12c0ec621e0ebf?placeholderIfAbsent=true&apiKey=203bcbe6c7e54880ad9777d1b8d81a89",
      // addressOrChart: "https://cdn.builder.io/api/v1/image/assets/TEMP/32f8b1cef757e17175bbbc46a1dd4c1160a0072f1c1c4eafff1737bed8bb72d2?placeholderIfAbsent=true&apiKey=203bcbe6c7e54880ad9777d1b8d81a89",
      addressOrChart: "0xdba346 ... dc::USDC",

      isPricePositive: prices[priceIds[1]]?.isPricePositive ?? true
    }
  ];

  return (
    <main className="flex flex-col self-stretch py-5 bg-zinc-900 max-w-[510px]" role="main">
      <header className="flex gap-1.5 self-start ml-3 text-sm leading-6 text-white">
        <h1 className="grow my-auto">Price Reference</h1>
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/614affaee36da06d3aee481db272e92d8353c5dbfbce40045671004d5d46508a?placeholderIfAbsent=true&apiKey=203bcbe6c7e54880ad9777d1b8d81a89" 
          alt="Price reference icon" 
          className="object-contain shrink-0 w-5 aspect-square" 
        />
      </header>
      {loading ? (
        <div role="alert" aria-busy="true" className="p-4 text-white">
          Loading prices...
        </div>
      ) : (
        tokens.map((token, index) => (
          <TokenCard key={`${token.tokenName}-${index}`} {...token} />
        ))
      )}
    </main>
  );
};

export default PriceWidget;
