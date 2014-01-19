//
//  RootViewController.m
//  BT4Experiment
//
//  Created by Geoffrey Woo on 1/18/14.
//  Copyright (c) 2014 Geoffrey Woo. All rights reserved.
//

#import "RootViewController.h"
#import "AdvertiseViewController.h"
#import "ReadViewController.h"

@interface RootViewController ()

@end

@implementation RootViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self.navigationController setNavigationBarHidden:NO];
    // Do any additional setup after loading the view from its nib.
}

- (void)viewViewAppear:(BOOL)animated
{
    self.navigationController.navigationBarHidden = YES;
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(IBAction)advertisesMode:(UIButton *)sender {
    AdvertiseViewController *avc = [[AdvertiseViewController alloc] init];

    [self.navigationController pushViewController:avc animated:YES];
}

-(IBAction)readMode:(UIButton *)sender {
    ReadViewController *rvc = [[ReadViewController alloc] init];
    [self.navigationController pushViewController:rvc animated:YES];
}

@end
