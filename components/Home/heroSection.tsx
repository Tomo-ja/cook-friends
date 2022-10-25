import { useRouter } from 'next/router';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import StyledSlideItem, { classNames } from "./heroSection.styles";
import StyledButton from '../Button/button.styles';

import { RecipeMinimize } from "../../helpers/typesLibrary";

type Props = {
	randomRecipes: RecipeMinimize[]
}

const HeroSection = ({ randomRecipes }: Props) => {

	const router = useRouter()

	const handleOnRecipeClick = (recipeId: number) => {
    router.push(`/recipe/${recipeId}`)
	}

	return (
		<section>
			<Swiper
				modules={[Navigation, Pagination, A11y, Autoplay]}
				spaceBetween={30}
				slidesPerView={1}
				navigation
				autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
				loop={true}
				pagination={{ clickable: true }}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
			{randomRecipes.map(recipe => (
				<SwiperSlide key={recipe.id}>
					<StyledSlideItem backgroundImageUrl={recipe.image}>
						<h2 className={classNames.textOnImage}>{recipe.title}</h2>
						<StyledButton width='30%' onClick={() => handleOnRecipeClick(recipe.id)}>See Detail</StyledButton>
					</StyledSlideItem>
				</SwiperSlide>
			))}
    </Swiper>

		</section>
	)
}

export default HeroSection