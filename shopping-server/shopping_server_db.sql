/*

 Source Server         : 本地MySQL
 Source Server Type    : MySQL
 Source Server Version : 50527
 Source Host           : localhost:3306
 Source Schema         : myqq_server

 Target Server Type    : MySQL
 Target Server Version : 50527
 File Encoding         : 65001

 Date: 02/03/2022 10:43:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '代理键',
  `userID` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户唯一标识',
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '密码',
  `userType` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '用户类型:0 普通用户,1 管理员',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for user_detail
-- ----------------------------
DROP TABLE IF EXISTS `user_detail`;
CREATE TABLE `user_detail`  (
  `userID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户id',
  `nickName` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `avator` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像链接',
  `signature` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '个性签名',
  `gender` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '性别:0女,1男',
  `birthday` date NULL DEFAULT NULL COMMENT '出生日期',
  PRIMARY KEY (`userID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `goodsId` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品id',
  `goodsName` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品卡片图',
  `swiper` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '推荐swiper图',
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品描述',
  `pirce` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品价格',
  `goodsClassify` enum('0','1','2','3','4') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '商品分类 0:默认 1:华为 2:vivo 3:苹果 4:小米',
  `isRecommend` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '是否设置推荐 0:否 1:是',
  `stock` int(11) NULL DEFAULT NULL COMMENT '商品库存',
  `date` datetime NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`goodsId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` INT(32) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '图片id',
  `url` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片url',
  `goodsId` VARCHAR(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所属商品ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = INNODB AUTO_INCREMENT = 10000 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Table structure for share
-- ----------------------------
DROP TABLE IF EXISTS `share`;
CREATE TABLE `share` (
  `shareID` int(11) NOT NULL AUTO_INCREMENT COMMENT '分享id',
  `avator` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分享者头像',
  `userID` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分享者id',
  `nickName` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分享者昵称',
  `contentImgSrc` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分享图片',
  `contentText` int(11) NULL DEFAULT NULL COMMENT '分享文字',
  `date` datetime NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`shareID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `commentID` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `userID` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '评论者id',
  `goodsId` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '评论商品id',
  `contentText` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '评论文字',
  `rate` int(11) NULL DEFAULT 5 COMMENT '评价分数',
  `date` datetime NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`CommentID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10000 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `userID` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `goodsID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品id',
  `commentStatus` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '评价状态 0:未评价 1:已评价',
  `payStatus` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '支付状态 0:未支付 1:已支付',
  `addressID`  int(11) NULL DEFAULT NULL COMMENT '收货地址id',
  `date` datetime NULL DEFAULT NULL COMMENT '时间',
  `count` int(11) NULL DEFAULT 0 COMMENT '数量',
  PRIMARY KEY (`orderID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10000 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;
-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `cartID` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `userID` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `goodsID` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品id',
  `gooodsName` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `imgUrl` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品卡片图',
  `pirce` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品价格',
  `count` int(11) NULL DEFAULT 0 COMMENT '数量',
  PRIMARY KEY (`cartID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `addressID` int(11) NOT NULL AUTO_INCREMENT COMMENT '地址id',
  `userID` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `addressDetail` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '详细地址',
  `areaCode` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地区码',
  `city` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '城市',
  `county` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '区县',
  `postalCode` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮政编码',
  `province` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '省',
  `tel` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收货人姓名',
  `status` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '删除标记 0:未删除 1:已删除',
  PRIMARY KEY (`addressID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10000 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for money
-- ----------------------------
DROP TABLE IF EXISTS `money`;
CREATE TABLE `money` (
  `id` INT(32) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '钱包id',
  `moneyFound` float NULL DEFAULT 0 COMMENT '钱包金额',
  `userID` VARCHAR(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户id',
  `moneyPassword` VARCHAR(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '123456' COMMENT '用户id',
  `date` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = INNODB AUTO_INCREMENT = 10000 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = COMPACT;
SET FOREIGN_KEY_CHECKS = 1;
