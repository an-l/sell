<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overviw">
        <h2 class="title">{{seller.name}}</h2>
        <div class="desc">
          <star :size="36" :score="seller.serviceScore"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="_toggleFavorite">
          <i class="icon icon-favorite" :class="{'active': favorited}"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h2 class="title">公告与活动</h2>
        <div class="content-wrapper">
          <p class="content">
            {{seller.bulletin}}
          </p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="supports-item" v-for="(item, index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h2 class="title">商家实景</h2>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h2 class="title">商家信息</h2>
        <ul>
          <li class="info-item" v-for="(info, index) in seller.infos" :key="index">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

import star from 'components/star/star'
import split from 'components/split/split'
import { saveToLocal, loadFromLocal } from 'common/js/util'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      favorited: (() => {
        return loadFromLocal(this.seller.id, 'favorired', false)
      })()
    }
  },
  computed: {
    favoriteText() {
      return this.favorited ? '已收藏' : '收藏'
    }
  },
  watch: {
    seller: function(newSeller) {
      console.log(newSeller)
      this._initScroll()
      this._initPicListScroll()
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  mounted() {
    this._initScroll()
  },
  methods: {
    _initScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll('.seller', {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    _initPicListScroll() {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        console.log(this.$refs.picList)
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          this.picScroll = new BScroll('.pic-wrapper', {
            click: true,
            scrollX: true
          })
        })
      }
    },
    _toggleFavorite() {
      this.favorited = !this.favorited
      saveToLocal(this.seller.id, 'favorired', this.favorited)
    }
  },
  components: {
    star,
    split
  }
}
</script>

<style lang="scss" type="text/css">
@import '../../common/scss/mixin.scss';

.seller {
  position: absolute;
  top: 177px;
  bottom: 0;
  width: 100%;
  overflow: hidden;

  .seller-content {
    .overviw {
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .desc {
        padding-bottom: 18px;
        line-height: 18px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0;
        .star {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          margin-right: 12px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          display: inline-block;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          text-align: center;
          &:last-child {
            border-right: 0;
          }
          .title {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            .stress {
              line-height: 24px;
              font-size: 24px;
              color: rgb(7, 17, 27);
            }
          }
        }
      }
      .favorite {
        position: absolute;
        width: 50px;
        top: 18px;
        right: 11px;
        text-align: center;

        .icon {
          display: block;
          margin-bottom: 4px;
          line-height: 24px;
          font-size: 24px;
          color: #d4d6d9;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          display: block;
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;

      .title {
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .content-wrapper {
        padding: 8px 12px 16px 12px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(220, 20, 20);
        }
      }
      .supports {
        .supports-item {
          padding: 16px 12px;
          line-height: 16px;
          font-size: 0;
          @include border-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            @include border-none();
          }

          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            vertical-align: top;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-image('decrease_4');
            }
            &.discount {
              @include bg-image('discount_4');
            }
            &.invoice {
              @include bg-image('invoice_4');
            }
            &.guarantee {
              @include bg-image('guarantee_4');
            }
            &.special {
              @include bg-image('special_4');
            }
          }
          .text {
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .pic-wrapper {
        width: 100%;
        height: 90px;
        margin-top: 12px;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
        }
        .pic-item {
          display: inline-block;
          width: 120px;
          height: 90px;
          margin-right: 6px;
        }
      }
    }
    .info {
      padding: 18px 18px 0 18px;
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        @include border-1px(rgba(7, 17, 27, 0.1));

        &:last-child {
          @include border-none();
        }
      }
    }
  }
}
</style>
