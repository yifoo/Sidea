/*
 Navicat Premium Data Transfer

 Source Server         : 本地服务器
 Source Server Type    : MariaDB
 Source Server Version : 100129
 Source Host           : localhost:3306
 Source Schema         : sidea

 Target Server Type    : MariaDB
 Target Server Version : 100129
 File Encoding         : 65001

 Date: 10/03/2018 17:59:53
*/
SET NAMES UTF8;
DROP DATABASE IF EXISTS sidea;
CREATE DATABASE sidea CHARSET=UTF8;
USE sidea;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sidea_ideas
-- ----------------------------
DROP TABLE IF EXISTS `sidea_ideas`;
CREATE TABLE `sidea_ideas`  (
  `sid` int(11) NOT NULL COMMENT 'idea编号',
  `idea_id` int(11) NULL DEFAULT NULL COMMENT '链接idea编号',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `rank` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '积分',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片',
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '作者',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '内容',
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`sid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sidea_img
-- ----------------------------
DROP TABLE IF EXISTS `sidea_img`;
CREATE TABLE `sidea_img`  (
  `pid` int(11) NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pic_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sidea_req
-- ----------------------------
DROP TABLE IF EXISTS `sidea_req`;
CREATE TABLE `sidea_req`  (
  `rid` int(11) NOT NULL AUTO_INCREMENT COMMENT '请求编号',
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求标题',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '内容',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片',
  `idea_id` int(11) NULL DEFAULT NULL COMMENT '创意id',
  `category` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求分类',
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '时间',
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '作者',
  PRIMARY KEY (`rid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sidea_req
-- ----------------------------
INSERT INTO `sidea_req` VALUES (1, '我需要画画的创意', '我有一个图形项目，我需要的东西来绘制潜在的动物园壁纸，动物和环境等，但我只是不知道什么动物画或环境的想法。', 'http://lorempixel.com/200/200/food/', 1, '创意', '1519550532717', '小王');
INSERT INTO `sidea_req` VALUES (2, '早餐和午餐的想法', '我想健康的吃早餐和午餐,但不知道怎么吃才不恶心', 'https://picsum.photos/300/200', 2, '生活', '1519550532717', '米兰');
INSERT INTO `sidea_req` VALUES (3, '拥区查提索。随盛济雷', '村巨的意走权！拥区查列状买顺诉汽讲闻司！背组席广贝！做海示证灵自影取整美妇！死伊敢脑门临向计画。视饭顾余充规望。务它旅利古跳数顿困救？各女几统军静坐够简切姐便散表警势真阳落！怀忆性路安类忘！喊普阳渐便部条告议？妙更何口列后姑们断莱！游奥料果细佛岁。底阳够？提索。随盛济雷落试？', 'http://via.placeholder.com/300x300', NULL, '礼物', NULL, NULL);
INSERT INTO `sidea_req` VALUES (4, '是一个标题的意走权', '村巨的意走权！拥区查列状买顺诉便部条告议？妙更何口列后姑们断莱！游奥料果细佛岁。底阳够？提索。随盛济雷落试？', 'https://picsum.photos/300/200', NULL, '生活', NULL, NULL);
INSERT INTO `sidea_req` VALUES (5, '个标题的意走权！拥区查提索', '村巨的意走权！拥区查列状买顺诉汽讲闻司！背组席广贝！做海示证灵自影取整美妇！死伊敢脑门临向计画。视饭顾余充规望。务它旅利古跳数顿困救？各女几统军静坐够简切姐便散表警势真阳落！怀忆性路安类忘！喊普阳渐便部条告议？妙更何口列后姑们断莱！游奥料果细佛岁。底阳够？提索。随盛济雷落试？', 'https://picsum.photos/300/200', NULL, '穿着', NULL, NULL);
INSERT INTO `sidea_req` VALUES (6, '早餐和午餐的想法', '我想健康的吃早餐和午餐,但不知道怎么吃才不恶心', 'https://picsum.photos/300/200', 2, '生活', '1519550532717', '米兰');
INSERT INTO `sidea_req` VALUES (7, '生日礼物的想法', '村巨的意走权！拥区查列状买顺诉汽讲闻司！背组席广贝！做海示证灵自影取整美妇！死伊敢脑门临向计画。视饭顾余充规望。务它旅利古跳数顿困救？各女几统军静坐够简切姐便散表警势真阳落！怀忆性路安类忘！喊普阳渐便部条告议？妙更何口列后姑们断莱！游奥料果细佛岁。底阳够？提索。随盛济雷落试？', 'http://lorempixel.com/200/200/food/', NULL, '礼物', NULL, NULL);
INSERT INTO `sidea_req` VALUES (8, '想知道家里该怎么装修', '我U我加速度好几万奥is海得控制形成会计安徽省的哈可接受的asdasd', 'http://lorempixel.com/200/200/sports/', NULL, '家居', NULL, NULL);
INSERT INTO `sidea_req` VALUES (9, '太胖了,我该怎么减肥', '我有一个图形项目，我需要的东西来绘制潜在的动物园壁纸，动物和环境等，但我只是不知道什么动物画或环境的想法。', 'http://lorempixel.com/200/200/sports/', NULL, '运动', NULL, NULL);
INSERT INTO `sidea_req` VALUES (10, '放假去哪里玩 ', '北京周边有没有好玩了,上班一族想放松一下,不想去嘈杂人多的地方', 'http://lorempixel.com/200/200/nature/', NULL, '旅行', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
