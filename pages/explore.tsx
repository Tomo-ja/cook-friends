import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import parseCookies from '../helpers'

import StyledExplore from '../components/Explore/explore.styles'
import StyledSearchBar from '../components/SearchBar/searchBar.styles'
import StyledMainContent from '../styles/mainContent.styles'
import StyledSubContent from '../styles/subContent.styles'

type Props = {
  data: {
    user: string
  }
}

const Explore: NextPage<Props> = ({ data }: Props) => {
	return (
		<StyledExplore>
      <Head>
        <title>Recipes | CF</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledSearchBar />
      <StyledMainContent>

      </StyledMainContent>
      <StyledSubContent>

      </StyledSubContent>

    </StyledExplore>
	)
}

export default Explore


Explore.getInitialProps = async ({ req, res }): Promise<Props> => {
  const data = parseCookies(req)

  if(res){
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: '/'})
      res.end()
    }
  }

  return {
    data: data && data
  } as Props
}