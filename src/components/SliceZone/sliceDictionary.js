// Slice Library

import { Hero } from 'components/Hero';
import {
  MultiQuoteSection,
  InlineQuoteSection,
} from 'components/Quotes';
import { SplitSection } from 'components/SplitSection';
import { ItemListSection } from 'components/ItemListSection';
import { CardGridSection } from 'components/CardGridSection';
import { AnimatedCtaSection } from 'components/AnimatedCtaSection';
import { CardStackSection } from 'components/CardStackSection';
import { VideoSection } from 'components/VideoSection';
import { DiagramSection } from 'components/DiagramSection';
import { Divider } from 'components/Divider';
import { SplitCopySection } from 'components/SplitCopySection';
import { CardSliderSection } from 'components/CardSliderSection';
import { LargeDiagramSection } from 'components/LargeDiagramSection';
import { ChatGraphicSection } from 'components/ChatGraphicSection';
import { ImageSection } from 'components/ImageSection';
import { TimelineSection } from 'components/TimelineSection';
import { IterableForm } from 'components/IterableForm';
import { AsFeaturedInPress } from 'components/AsFeaturedInPress';
import ProductComparison from 'components/ProductComparison';
import ReviewsIOCarousel from 'components/ReviewsIOCarousel';
import ReviewsIOCompound from 'components/ReviewsIOCompound';
import { InvestorsSection, PersonnelSection } from 'components/About';
import { MemberStories } from 'components/MemberStories';
import ComparisonTable from 'components/ComparisonTable';
import { Accordion } from 'components/Accordion';
import { ExpandablePoints } from 'components/ExpandablePoints';
import { DividedSection } from 'components/DividedSection';
import { TableOfContents } from 'components/TableOfContents';
import {
  DynamicCards,
  ValueProps,
  CopyWithList,
  BigStat,
  PDP,
  FocusedComparisonTable,
} from 'components/FocusedComponents';
import { FixedCards } from 'components/FixedCards';
import { StatsGrid } from 'components/StatsGrid';
import { MultipleStats } from 'components/MultipleStats';
import { Resources } from 'components/Resources';
import { PlanSlice } from 'components/Pricing';
import { RotatingWords } from 'components/RotatingWords';
import { StarRating } from 'components/StarRating';
import { BarChartSection } from 'components/BarChartSection';
import { SideBySide } from 'components/SideBySide';
import { TextGrid } from 'components/TextGrid';
import { HPHero } from 'components/HPHero';
import { ImagesCarousel } from 'components/ImagesCarousel';
import { BasicBlock } from 'components/BasicBlock';

/**
 * Define new slices here
 * @key slice_type
 * @value Component
 */
export const sliceDictionary = {
  hero: Hero,
  single_quote_section: InlineQuoteSection,
  multi_quote_section: MultiQuoteSection,
  split_section: SplitSection,
  split_copy_section: SplitCopySection,
  item_list_section: ItemListSection,
  card_grid_section: CardGridSection,
  video_section: VideoSection,
  animated_cta_section: AnimatedCtaSection,
  card_stack_section: CardStackSection,
  diagram_section: DiagramSection,
  inline_quote_section: InlineQuoteSection,
  divider: Divider,
  card_slider_section: CardSliderSection,
  large_diagram_section: LargeDiagramSection,
  chat_graphic_section: ChatGraphicSection,
  image_section: ImageSection,
  timeline_section: TimelineSection,
  iterable_form: IterableForm,
  as_featured_in_press: AsFeaturedInPress,
  product_comparison: ProductComparison,
  reviews: ReviewsIOCarousel,
  reviews_compound: ReviewsIOCompound,
  personnel_section: PersonnelSection,
  member_stories: MemberStories,
  posts_gallery: FixedCards,
  comparison_table: ComparisonTable,
  // Focused project slices, are available at all project
  basic_block: BasicBlock,
  value_props: ValueProps,
  side_by_side: SideBySide,
  dynamic_cards: DynamicCards,
  fixed_cards: FixedCards,
  copy_with_list: CopyWithList,
  big_stat: BigStat,
  focused_hero: Hero,
  focused_comparison_table: FocusedComparisonTable,
  rotating_words: RotatingWords,
  bar_chart: BarChartSection,
  pdp: PDP,
  accordion: Accordion,
  expandable_points: ExpandablePoints,
  divided_section: DividedSection,
  point_hero: Hero,
  stats_grid: StatsGrid,
  multiple_stats: MultipleStats,
  investors_section: InvestorsSection,
  vip_section: SideBySide, // Slice consolidatin TK
  resources: Resources,
  table_of_contents: TableOfContents,
  price_plans: PlanSlice,
  star_rating: StarRating,
  text_grid: TextGrid,
  hp_hero: HPHero,
  images_carousel: ImagesCarousel,
};
